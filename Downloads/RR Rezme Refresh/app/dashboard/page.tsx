'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Cloud, User } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const [saving, setSaving] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    const email = localStorage.getItem('userEmail');
    if (email) {
      setUserEmail(email);
    }
    const savedImage = localStorage.getItem('profileImage');
    if (savedImage) {
      setProfileImage(savedImage);
    }
  }, []);

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      router.push('/restorative-record');
    }, 1000);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageData = reader.result as string;
        setProfileImage(imageData);
        localStorage.setItem('profileImage', imageData);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="min-h-screen bg-white p-4 md:p-8">
      <div className="mx-auto max-w-4xl space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-2xl font-semibold tracking-tight">Personal Profile</h1>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <Cloud className="h-4 w-4" />
              <span>Saved to Cloud</span>
            </div>
          </div>
        </div>

        <Tabs defaultValue="personal" className="w-full">
          <TabsList className="w-full border-b bg-transparent p-0">
            <TabsTrigger
              value="personal"
              className="relative rounded-none border-b-2 border-transparent px-4 pb-3 pt-2 font-medium text-gray-600 hover:text-gray-900 data-[state=active]:border-primary data-[state=active]:text-gray-900"
            >
              Personal Info
            </TabsTrigger>
            <TabsTrigger
              value="contact"
              className="relative rounded-none border-b-2 border-transparent px-4 pb-3 pt-2 font-medium text-gray-600 hover:text-gray-900 data-[state=active]:border-primary data-[state=active]:text-gray-900"
            >
              Contact Info
            </TabsTrigger>
            <TabsTrigger
              value="privacy"
              className="relative rounded-none border-b-2 border-transparent px-4 pb-3 pt-2 font-medium text-gray-600 hover:text-gray-900 data-[state=active]:border-primary data-[state=active]:text-gray-900"
            >
              Privacy Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="personal" className="space-y-8 py-4">
            <div className="flex flex-col items-start justify-between gap-8 md:flex-row">
              <div className="w-full space-y-6 md:w-2/3">
                <div className="space-y-2">
                  <Label htmlFor="legal-name" className="text-sm font-medium text-gray-900">
                    Legal name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="legal-name"
                    placeholder="Enter legal name"
                    className="bg-gray-100"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="preferred-name" className="text-sm font-medium text-gray-900">
                    Preferred name
                  </Label>
                  <Input
                    id="preferred-name"
                    placeholder="Enter preferred name"
                    className="bg-gray-100"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-900">
                    Legal gender <span className="text-red-500">*</span>
                  </Label>
                  <RadioGroup defaultValue="female" className="flex gap-6">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="female" id="female" />
                      <Label htmlFor="female">Female</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="male" id="male" />
                      <Label htmlFor="male">Male</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="nonbinary" id="nonbinary" />
                      <Label htmlFor="nonbinary">Nonbinary</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="prefer-not" id="prefer-not" />
                      <Label htmlFor="prefer-not">I prefer not to disclose</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pronouns" className="text-sm font-medium text-gray-900">
                    Pronouns
                  </Label>
                  <Select>
                    <SelectTrigger className="bg-gray-100">
                      <SelectValue placeholder="Select..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="she-her">She/Her</SelectItem>
                      <SelectItem value="he-him">He/Him</SelectItem>
                      <SelectItem value="they-them">They/Them</SelectItem>
                      <SelectItem value="prefer-not">Prefer not to say</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="birthdate" className="text-sm font-medium text-gray-900">
                    Birthdate <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="birthdate"
                    type="date"
                    placeholder="MM/DD/YYYY"
                    className="bg-gray-100"
                  />
                </div>
              </div>

              <div className="flex w-full flex-col items-center space-y-4 md:w-1/3">
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
                <Avatar className="h-32 w-32">
                  <AvatarImage src={profileImage || ''} />
                  <AvatarFallback className="bg-gray-100">
                    <User className="h-16 w-16 text-gray-400" />
                  </AvatarFallback>
                </Avatar>
                <Button variant="outline" className="w-full" onClick={handleEditClick}>
                  Upload Photo
                </Button>
                <p className="text-xs text-gray-500">
                  Upload a professional photo of yourself
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="contact" className="space-y-8 py-4">
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="flex-grow space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-gray-900">
                    Email <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={userEmail}
                    disabled
                    className="bg-gray-100"
                  />
                </div>
                <div className="pt-7">
                  <Button 
                    variant="outline" 
                    className="h-10"
                    onClick={() => router.push('/change-email')}
                  >
                    CHANGE EMAIL
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm font-medium text-gray-900">
                  Phone <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="(000) 000-0000"
                  className="bg-gray-100"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address1" className="text-sm font-medium text-gray-900">
                  Address Line 1 <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="address1"
                  placeholder="Enter address line 1"
                  className="bg-gray-100"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address2" className="text-sm font-medium text-gray-900">
                  Address Line 2
                </Label>
                <Input
                  id="address2"
                  placeholder="Enter address line 2"
                  className="bg-gray-100"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="city" className="text-sm font-medium text-gray-900">
                  City <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="city"
                  placeholder="City"
                  className="bg-gray-100"
                />
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="state" className="text-sm font-medium text-gray-900">
                    State <span className="text-red-500">*</span>
                  </Label>
                  <Select>
                    <SelectTrigger className="bg-gray-100">
                      <SelectValue placeholder="Select..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="AL">Alabama</SelectItem>
                      <SelectItem value="AK">Alaska</SelectItem>
                      <SelectItem value="AZ">Arizona</SelectItem>
                      <SelectItem value="AR">Arkansas</SelectItem>
                      <SelectItem value="CA">California</SelectItem>
                      <SelectItem value="CO">Colorado</SelectItem>
                      <SelectItem value="CT">Connecticut</SelectItem>
                      <SelectItem value="DE">Delaware</SelectItem>
                      <SelectItem value="FL">Florida</SelectItem>
                      <SelectItem value="GA">Georgia</SelectItem>
                      <SelectItem value="HI">Hawaii</SelectItem>
                      <SelectItem value="ID">Idaho</SelectItem>
                      <SelectItem value="IL">Illinois</SelectItem>
                      <SelectItem value="IN">Indiana</SelectItem>
                      <SelectItem value="IA">Iowa</SelectItem>
                      <SelectItem value="KS">Kansas</SelectItem>
                      <SelectItem value="KY">Kentucky</SelectItem>
                      <SelectItem value="LA">Louisiana</SelectItem>
                      <SelectItem value="ME">Maine</SelectItem>
                      <SelectItem value="MD">Maryland</SelectItem>
                      <SelectItem value="MA">Massachusetts</SelectItem>
                      <SelectItem value="MI">Michigan</SelectItem>
                      <SelectItem value="MN">Minnesota</SelectItem>
                      <SelectItem value="MS">Mississippi</SelectItem>
                      <SelectItem value="MO">Missouri</SelectItem>
                      <SelectItem value="MT">Montana</SelectItem>
                      <SelectItem value="NE">Nebraska</SelectItem>
                      <SelectItem value="NV">Nevada</SelectItem>
                      <SelectItem value="NH">New Hampshire</SelectItem>
                      <SelectItem value="NJ">New Jersey</SelectItem>
                      <SelectItem value="NM">New Mexico</SelectItem>
                      <SelectItem value="NY">New York</SelectItem>
                      <SelectItem value="NC">North Carolina</SelectItem>
                      <SelectItem value="ND">North Dakota</SelectItem>
                      <SelectItem value="OH">Ohio</SelectItem>
                      <SelectItem value="OK">Oklahoma</SelectItem>
                      <SelectItem value="OR">Oregon</SelectItem>
                      <SelectItem value="PA">Pennsylvania</SelectItem>
                      <SelectItem value="RI">Rhode Island</SelectItem>
                      <SelectItem value="SC">South Carolina</SelectItem>
                      <SelectItem value="SD">South Dakota</SelectItem>
                      <SelectItem value="TN">Tennessee</SelectItem>
                      <SelectItem value="TX">Texas</SelectItem>
                      <SelectItem value="UT">Utah</SelectItem>
                      <SelectItem value="VT">Vermont</SelectItem>
                      <SelectItem value="VA">Virginia</SelectItem>
                      <SelectItem value="WA">Washington</SelectItem>
                      <SelectItem value="WV">West Virginia</SelectItem>
                      <SelectItem value="WI">Wisconsin</SelectItem>
                      <SelectItem value="WY">Wyoming</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="zipcode" className="text-sm font-medium text-gray-900">
                    Zip code <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="zipcode"
                    placeholder="Zip code"
                    className="bg-gray-100"
                  />
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-between pt-6">
          <Button variant="outline" className="border-red-500 text-red-500 hover:bg-red-50">
            DELETE PROFILE
          </Button>
          <Button 
            onClick={handleSave}
            disabled={saving}
            className="bg-primary text-white hover:bg-primary/90"
          >
            TO RESTORATIVE RECORD
          </Button>
        </div>
      </div>
    </div>
  );
}