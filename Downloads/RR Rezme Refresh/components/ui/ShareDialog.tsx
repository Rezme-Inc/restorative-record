import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from './dialog';
import { Button } from './button';
import { Input } from './input';

interface EmployerInfo {
  name: string;
  logoUrl: string;
}

interface ShareDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  employer?: EmployerInfo;
  recordUrl: string;
}

export function ShareDialog({ open, onOpenChange, employer, recordUrl }: ShareDialogProps) {
  const [shareOption, setShareOption] = useState<'emails' | 'everyone' | 'private' | 'employer'>('private');
  const [email, setEmail] = useState('');
  const [emails, setEmails] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);

  const handleAddEmail = () => {
    if (email && !emails.includes(email)) {
      setEmails([...emails, email]);
      setEmail('');
      setShareOption('emails');
    }
  };

  const handleCopyLink = async () => {
    await navigator.clipboard.writeText(recordUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Share your Restorative Record</DialogTitle>
          <DialogDescription>
            Choose how you want to share your record.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          {/* Share with specific people */}
          <div className="border rounded p-3">
            <label className="font-medium flex items-center gap-2">
              <input
                type="radio"
                checked={shareOption === 'emails'}
                onChange={() => setShareOption('emails')}
              />
              Share with specific people
            </label>
            <div className="text-sm text-gray-500 mb-2 ml-6">Only people you add will be able to view this record.</div>
            <div className="flex gap-2 ml-6">
              <Input
                type="email"
                placeholder="Enter email address"
                value={email}
                onChange={e => setEmail(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleAddEmail()}
              />
              <Button type="button" onClick={handleAddEmail}>Add</Button>
            </div>
            {emails.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2 ml-6">
                {emails.map(e => (
                  <span key={e} className="bg-gray-200 text-gray-700 rounded-full px-3 py-1 text-xs flex items-center">
                    {e}
                    <button className="ml-2 text-red-500" onClick={() => setEmails(emails.filter(x => x !== e))}>&times;</button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Share with everyone */}
          <div className="border rounded p-3 flex items-center gap-2">
            <input
              type="radio"
              checked={shareOption === 'everyone'}
              onChange={() => setShareOption('everyone')}
            />
            <div>
              <div className="font-medium">Share with everyone</div>
              <div className="text-sm text-gray-500">Anyone with the link can view your record.</div>
            </div>
          </div>

          {/* Keep it private */}
          <div className="border rounded p-3 flex items-center gap-2">
            <input
              type="radio"
              checked={shareOption === 'private'}
              onChange={() => setShareOption('private')}
            />
            <div>
              <div className="font-medium">Keep it private</div>
              <div className="text-sm text-gray-500">Only you can view this record.</div>
            </div>
          </div>

          {/* Share with employer who requested it */}
          {employer && (
            <div className="border rounded p-3 flex items-center gap-2">
              <input
                type="radio"
                checked={shareOption === 'employer'}
                onChange={() => setShareOption('employer')}
              />
              <img src={employer.logoUrl} alt={employer.name} className="h-6 w-6 rounded-full" />
              <div>
                <div className="font-medium">Share with employer who requested it</div>
                <div className="text-sm text-gray-500">Only {employer.name} can view this record.</div>
              </div>
            </div>
          )}

          {/* Copy link */}
          <div className="border rounded p-3 flex items-center gap-2">
            <Button type="button" onClick={handleCopyLink}>
              {copied ? 'Link Copied!' : 'Copy Link'}
            </Button>
            <span className="text-sm text-gray-500">Copy a link to share this record.</span>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button">Done</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
} 