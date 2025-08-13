'use client'

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { MdEdit, MdSave, MdCancel, MdCameraAlt, MdArrowBack } from 'react-icons/md';
import { FaUser, FaIdCard, FaCalendarAlt } from 'react-icons/fa';
import { HiOutlineUser, HiOutlineMail, HiOutlinePhone, HiOutlineLocationMarker } from 'react-icons/hi';

interface UserProfile {
  id: string;
  username: string;
  fullName: string;
  email: string;
  role: string;
  profilePicture: string;
  nationalId: string;
  dateOfBirth: string;
  fatherName: string;
  motherName: string;
  mobileNumber: string;
  alternateMobile: string;
  address: string;
  city: string;
  country: string;
  emergencyContact: string;
  emergencyRelation: string;
  bloodGroup: string;
  gender: string;
  department: string;
  joiningDate: string;
  qualification: string;
  experience: string;
}

interface ProfileSettingsProps {
  isOpen: boolean;
  onClose: () => void;
  userProfile: UserProfile;
  onUpdateProfile: (profile: UserProfile) => void;
}

const ProfileSettings: React.FC<ProfileSettingsProps> = ({
  isOpen,
  onClose,
  userProfile,
  onUpdateProfile
}) => {
  const [profile, setProfile] = useState<UserProfile>(userProfile);
  const [isEditing, setIsEditing] = useState(false);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    setProfile(userProfile);
    setImagePreview(userProfile.profilePicture);
  }, [userProfile]);

  const handleInputChange = (field: keyof UserProfile, value: string) => {
    setProfile(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    setIsLoading(true);
    setMessage(null);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Update profile with new image if selected
      const updatedProfile = {
        ...profile,
        profilePicture: imagePreview
      };
      
      onUpdateProfile(updatedProfile);
      setIsEditing(false);
      setImagePreview(userProfile.profilePicture); // Revert to original image
      setMessage({ type: 'success', text: 'Profile updated successfully!' });
      
      // Clear message after 3 seconds
      setTimeout(() => setMessage(null), 3000);
    } catch (_error) {
      setMessage({ type: 'error', text: 'Failed to update profile. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setProfile(userProfile);
    setImagePreview(userProfile.profilePicture);
    setIsEditing(false);
    setMessage(null);
  };

  if (!isOpen) return null;

  return (
         <div className="fixed inset-0 bg-gradient-to-br from-purple-900/80 via-indigo-900/80 to-slate-900/80 backdrop-blur-xl flex items-center justify-center p-4 z-40">
       <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl max-w-5xl w-full max-h-[95vh] border border-white/20 overflow-hidden relative">
         {/* Close Button */}
         <button
           onClick={onClose}
           className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-colors backdrop-blur-sm z-10"
         >
           <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
           </svg>
         </button>
                 

        {/* Message */}
        {message && (
          <div className={`mx-6 mt-4 p-3 rounded-lg backdrop-blur-sm ${
            message.type === 'success' 
              ? 'bg-green-500/20 border border-green-400/30 text-green-200' 
              : 'bg-red-500/20 border border-red-400/30 text-red-200'
          }`}>
            <p className="font-poppins text-sm">{message.text}</p>
          </div>
        )}

                 {/* Scrollable Content Container */}
         <div className="overflow-y-auto max-h-[95vh] scroll-container">
           <div className="p-6 pt-16">
            {/* Profile Picture Section */}
            <div className="mb-8 p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
              <div className="flex items-center space-x-6">
                <div className="relative">
                  <div className="w-32 h-32 rounded-full overflow-hidden bg-white/10 backdrop-blur-sm border-2 border-white/20">
                    {imagePreview ? (
                      <Image
                        src={imagePreview}
                        alt="Profile Picture"
                        width={128}
                        height={128}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <FaUser className="text-4xl text-white/60" />
                      </div>
                    )}
                  </div>
                  {isEditing && (
                    <label className="absolute bottom-0 right-0 w-10 h-10 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full flex items-center justify-center cursor-pointer hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 shadow-lg backdrop-blur-sm">
                      <MdCameraAlt className="text-white text-lg" />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white font-poppins mb-2">
                    {profile.fullName}
                  </h3>
                  <p className="text-purple-200 font-poppins mb-1">{profile.role}</p>
                  <p className="text-gray-300 font-poppins text-sm">{profile.department}</p>
                  <div className="flex space-x-2 mt-3">
                    {isEditing ? (
                      <>
                        <button
                          onClick={handleSave}
                          disabled={isLoading}
                          className="px-4 py-2 bg-gradient-to-r from-green-600 to-green-500 text-white rounded-lg hover:from-green-700 hover:to-green-600 transition-all duration-300 font-poppins text-sm flex items-center space-x-1 disabled:opacity-50 backdrop-blur-sm shadow-lg"
                        >
                          <MdSave className="text-sm" />
                          <span>{isLoading ? 'Saving...' : 'Save Changes'}</span>
                        </button>
                        <button
                          onClick={handleCancel}
                          className="px-4 py-2 bg-gradient-to-r from-gray-600 to-gray-500 text-white rounded-lg hover:from-gray-700 hover:to-gray-600 transition-all duration-300 font-poppins text-sm flex items-center space-x-1 backdrop-blur-sm shadow-lg"
                        >
                          <MdCancel className="text-sm" />
                          <span>Cancel</span>
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => setIsEditing(true)}
                        className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 font-poppins text-sm flex items-center space-x-1 backdrop-blur-sm shadow-lg"
                      >
                        <MdEdit className="text-sm" />
                        <span>Edit Profile</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Profile Information */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Personal Information */}
              <div className="space-y-6 p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
                <h4 className="text-lg font-semibold text-white font-poppins border-b border-white/20 pb-2">
                  Personal Information
                </h4>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-purple-200 mb-1 font-poppins">
                      Full Name
                    </label>
                    <div className="relative">
                      <HiOutlineUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-300" />
                      <input
                        type="text"
                        value={profile.fullName}
                        onChange={(e) => handleInputChange('fullName', e.target.value)}
                        disabled={!isEditing}
                        className="w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent disabled:bg-white/5 text-white placeholder-gray-300 font-poppins"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-purple-200 mb-1 font-poppins">
                      Email Address
                    </label>
                    <div className="relative">
                      <HiOutlineMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-300" />
                      <input
                        type="email"
                        value={profile.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        disabled={!isEditing}
                        className="w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent disabled:bg-white/5 text-white placeholder-gray-300 font-poppins"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-purple-200 mb-1 font-poppins">
                      National ID
                    </label>
                    <div className="relative">
                      <FaIdCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-300" />
                      <input
                        type="text"
                        value={profile.nationalId}
                        onChange={(e) => handleInputChange('nationalId', e.target.value)}
                        disabled={!isEditing}
                        className="w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent disabled:bg-white/5 text-white placeholder-gray-300 font-poppins"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-purple-200 mb-1 font-poppins">
                      Date of Birth
                    </label>
                    <div className="relative">
                      <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-300" />
                      <input
                        type="date"
                        value={profile.dateOfBirth}
                        onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                        disabled={!isEditing}
                        className="w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent disabled:bg-white/5 text-white placeholder-gray-300 font-poppins"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-purple-200 mb-1 font-poppins">
                        Gender
                      </label>
                      <select
                        value={profile.gender}
                        onChange={(e) => handleInputChange('gender', e.target.value)}
                        disabled={!isEditing}
                        className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent disabled:bg-white/5 text-white font-poppins [&>option]:bg-slate-800 [&>option]:text-white"
                      >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-purple-200 mb-1 font-poppins">
                        Blood Group
                      </label>
                      <select
                        value={profile.bloodGroup}
                        onChange={(e) => handleInputChange('bloodGroup', e.target.value)}
                        disabled={!isEditing}
                        className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent disabled:bg-white/5 text-white font-poppins [&>option]:bg-slate-800 [&>option]:text-white"
                      >
                        <option value="">Select Blood Group</option>
                        <option value="A+">A+</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="B-">B-</option>
                        <option value="AB+">AB+</option>
                        <option value="AB-">AB-</option>
                        <option value="O+">O+</option>
                        <option value="O-">O-</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-6 p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
                <h4 className="text-lg font-semibold text-white font-poppins border-b border-white/20 pb-2">
                  Contact Information
                </h4>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-purple-200 mb-1 font-poppins">
                      Mobile Number
                    </label>
                    <div className="relative">
                      <HiOutlinePhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-300" />
                      <input
                        type="tel"
                        value={profile.mobileNumber}
                        onChange={(e) => handleInputChange('mobileNumber', e.target.value)}
                        disabled={!isEditing}
                        className="w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent disabled:bg-white/5 text-white placeholder-gray-300 font-poppins"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-purple-200 mb-1 font-poppins">
                      Alternate Mobile
                    </label>
                    <div className="relative">
                      <HiOutlinePhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-300" />
                      <input
                        type="tel"
                        value={profile.alternateMobile}
                        onChange={(e) => handleInputChange('alternateMobile', e.target.value)}
                        disabled={!isEditing}
                        className="w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent disabled:bg-white/5 text-white placeholder-gray-300 font-poppins"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-purple-200 mb-1 font-poppins">
                      Address
                    </label>
                    <div className="relative">
                      <HiOutlineLocationMarker className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-300" />
                      <textarea
                        value={profile.address}
                        onChange={(e) => handleInputChange('address', e.target.value)}
                        disabled={!isEditing}
                        rows={3}
                        className="w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent disabled:bg-white/5 text-white placeholder-gray-300 font-poppins resize-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-purple-200 mb-1 font-poppins">
                        City
                      </label>
                      <input
                        type="text"
                        value={profile.city}
                        onChange={(e) => handleInputChange('city', e.target.value)}
                        disabled={!isEditing}
                        className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent disabled:bg-white/5 text-white placeholder-gray-300 font-poppins"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-purple-200 mb-1 font-poppins">
                        Country
                      </label>
                      <input
                        type="text"
                        value={profile.country}
                        onChange={(e) => handleInputChange('country', e.target.value)}
                        disabled={!isEditing}
                        className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent disabled:bg-white/5 text-white placeholder-gray-300 font-poppins"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Family Information */}
              <div className="space-y-6 p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
                <h4 className="text-lg font-semibold text-white font-poppins border-b border-white/20 pb-2">
                  Family Information
                </h4>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-purple-200 mb-1 font-poppins">
                      Father&apos;s Name
                    </label>
                    <input
                      type="text"
                      value={profile.fatherName}
                      onChange={(e) => handleInputChange('fatherName', e.target.value)}
                      disabled={!isEditing}
                      className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent disabled:bg-white/5 text-white placeholder-gray-300 font-poppins"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-purple-200 mb-1 font-poppins">
                      Mother&apos;s Name
                    </label>
                    <input
                      type="text"
                      value={profile.motherName}
                      onChange={(e) => handleInputChange('motherName', e.target.value)}
                      disabled={!isEditing}
                      className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent disabled:bg-white/5 text-white placeholder-gray-300 font-poppins"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-purple-200 mb-1 font-poppins">
                      Emergency Contact
                    </label>
                    <input
                      type="tel"
                      value={profile.emergencyContact}
                      onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
                      disabled={!isEditing}
                      className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent disabled:bg-white/5 text-white placeholder-gray-300 font-poppins"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-purple-200 mb-1 font-poppins">
                      Emergency Contact Relation
                    </label>
                    <input
                      type="text"
                      value={profile.emergencyRelation}
                      onChange={(e) => handleInputChange('emergencyRelation', e.target.value)}
                      disabled={!isEditing}
                      className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent disabled:bg-white/5 text-white placeholder-gray-300 font-poppins"
                    />
                  </div>
                </div>
              </div>

              {/* Professional Information */}
              <div className="space-y-6 p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
                <h4 className="text-lg font-semibold text-white font-poppins border-b border-white/20 pb-2">
                  Professional Information
                </h4>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-purple-200 mb-1 font-poppins">
                      Department
                    </label>
                    <input
                      type="text"
                      value={profile.department}
                      onChange={(e) => handleInputChange('department', e.target.value)}
                      disabled={!isEditing}
                      className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent disabled:bg-white/5 text-white placeholder-gray-300 font-poppins"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-purple-200 mb-1 font-poppins">
                      Joining Date
                    </label>
                    <input
                      type="date"
                      value={profile.joiningDate}
                      onChange={(e) => handleInputChange('joiningDate', e.target.value)}
                      disabled={!isEditing}
                      className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent disabled:bg-white/5 text-white placeholder-gray-300 font-poppins"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-purple-200 mb-1 font-poppins">
                      Qualification
                    </label>
                    <input
                      type="text"
                      value={profile.qualification}
                      onChange={(e) => handleInputChange('qualification', e.target.value)}
                      disabled={!isEditing}
                      className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent disabled:bg-white/5 text-white placeholder-gray-300 font-poppins"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-purple-200 mb-1 font-poppins">
                      Experience (Years)
                    </label>
                    <input
                      type="text"
                      value={profile.experience}
                      onChange={(e) => handleInputChange('experience', e.target.value)}
                      disabled={!isEditing}
                      className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent disabled:bg-white/5 text-white placeholder-gray-300 font-poppins"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings; 