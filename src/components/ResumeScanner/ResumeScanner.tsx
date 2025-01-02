import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Progress } from '@/components/ui/progress'
import { Label } from '@/components/ui/label'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Upload, Check, Loader2 } from 'lucide-react'

const ResumeScanner: React.FC = () => {
  const [file, setFile] = useState<File | null>(null)
  const [jobDescription, setJobDescription] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>('')
  const [progress, setProgress] = useState<number>(0)
  const navigate = useNavigate()

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile)
      setError('')
    } else {
      setError('Please upload a PDF file')
      setFile(null)
    }
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    if (!file || !jobDescription) {
      setError('Please provide both resume and job description')
      return
    }
    setLoading(true)
    setError('')
    const formData = new FormData()
    formData.append('resume', file)
    formData.append('jobDescription', jobDescription)

    try {
      const response = await fetch('https://jobmatch-api.vercel.app/api/analyze', {
        method: 'POST',
        body: formData,
      })
      const data = await response.json()
      if (response.ok) {
        navigate('/dashboard', { state: { analysis: data } })
      } else {
        setError(data.error || 'Analysis failed')
      }
    } catch (err) {
      setError('Failed to connect to server')
    } finally {
      setLoading(false)
      setProgress(0)
    }
  }

  useEffect(() => {
    if (loading) {
      const interval = setInterval(() => {
        setProgress((oldProgress) => {
          const newProgress = Math.min(oldProgress + 10, 90)
          return newProgress
        })
      }, 500)
      return () => clearInterval(interval)
    }
  }, [loading])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <Card className="w-full max-w-2xl shadow-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">JobMatch Analyzer</CardTitle>
          <CardDescription className="text-center">
            Upload your resume and paste the job description to get personalized insights
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="resume-upload">Upload Resume (PDF)</Label>
              <div className="flex items-center space-x-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => document.getElementById('resume-upload')?.click()}
                      className="w-full"
                    >
                      <Upload className="mr-2 h-4 w-4" />
                      Choose File
                    </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Upload a PDF version of your resume</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <input
                id="resume-upload"
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                className="hidden"
              />
              {file && (
                <div className="flex items-center gap-2 text-green-600">
                  <Check className="h-4 w-4" /> {file.name}
                </div>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="job-description">Job Description</Label>
              <Textarea
                id="job-description"
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste job description here..."
                className="min-h-[200px] resize-none"
              />
            </div>
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                'Analyze Resume'
              )}
            </Button>
            {loading && (
              <div className="space-y-2">
                <Progress value={progress} className="w-full" />
                <p className="text-sm text-center text-muted-foreground">
                  Analyzing your resume... This may take a moment.
                </p>
              </div>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default ResumeScanner

