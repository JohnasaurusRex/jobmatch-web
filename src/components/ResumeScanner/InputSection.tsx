import React, { ChangeEvent, FormEvent } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface InputSectionProps {
  file: File | null;
  jobDescription: string;
  setFile: (file: File | null) => void;
  setJobDescription: (desc: string) => void;
  setAnalysis: (analysis: any) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string) => void;
  error: string;
  loading: boolean;
}

const InputSection: React.FC<InputSectionProps> = ({
  file,
  jobDescription,
  setFile,
  setJobDescription,
  setAnalysis,
  setLoading,
  setError,
  error,
  loading,
}) => {
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile?.type === 'application/pdf') {
      setFile(selectedFile);
      setError('');
    } else {
      setError('Please upload a PDF file');
      setFile(null);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file || !jobDescription) {
      setError('Please provide both resume and job description');
      return;
    }

    setLoading(true);
    setError('');

    const formData = new FormData();
    formData.append('resume', file);
    formData.append('jobDescription', jobDescription);

    try {
      const response = await fetch('http://localhost:5000/api/analyze', { method: 'POST', body: formData });
      const data = await response.json();
      response.ok ? setAnalysis(data) : setError(data.error || 'Analysis failed');
    } catch {
      setError('Failed to connect to server');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-1/2 h-full">
      <CardHeader className="border-b">
        <CardTitle>Resume Scanner Input</CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="block font-medium">Upload Resume (PDF)</label>
            <div className="flex items-center space-x-2">
              <Button onClick={() => document.getElementById('resume-upload')?.click()} className="flex items-center space-x-2">
                <span>Choose File</span>
              </Button>
              {file && <span>{file.name}</span>}
            </div>
            <input id="resume-upload" type="file" accept=".pdf" onChange={handleFileChange} className="hidden" />
          </div>

          <div className="space-y-2">
            <label className="block font-medium">Job Description</label>
            <Textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste job description here..."
            />
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Button type="submit" disabled={loading || !file || !jobDescription}>
            {loading ? 'Analyzing...' : 'Analyze Resume'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default InputSection;
