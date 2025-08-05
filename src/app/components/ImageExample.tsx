'use client'

import React from 'react';
import Image from 'next/image';

const ImageExample = () => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Next.js Image Component Examples</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Example 1: Basic Image with proper sizing */}
        <div className="border rounded-lg p-4">
          <h3 className="font-semibold mb-2">Basic Image</h3>
          <Image
            src="/images/cse.jpg"
            alt="Computer Science Course"
            width={300}
            height={200}
            className="rounded-lg"
          />
          <p className="text-sm text-gray-600 mt-2">
            Basic image with width and height props
          </p>
        </div>

        {/* Example 2: Image with object-fit */}
        <div className="border rounded-lg p-4">
          <h3 className="font-semibold mb-2">Image with object-fit</h3>
          <div className="relative w-full h-48">
            <Image
              src="/images/data.jpg"
              alt="Data Science Course"
              fill
              className="object-cover rounded-lg"
            />
          </div>
          <p className="text-sm text-gray-600 mt-2">
            Using fill prop with object-cover
          </p>
        </div>

        {/* Example 3: Responsive Image */}
        <div className="border rounded-lg p-4">
          <h3 className="font-semibold mb-2">Responsive Image</h3>
          <Image
            src="/images/ai.jpg"
            alt="AI Course"
            width={0}
            height={0}
            sizes="100vw"
            className="w-full h-auto rounded-lg"
          />
          <p className="text-sm text-gray-600 mt-2">
            Responsive image that scales with container
          </p>
        </div>

        {/* Example 4: Avatar Image */}
        <div className="border rounded-lg p-4">
          <h3 className="font-semibold mb-2">Avatar Image</h3>
          <div className="flex items-center space-x-4">
            <Image
              src="/images/student1.jpg"
              alt="Student Avatar"
              width={50}
              height={50}
              className="rounded-full object-cover"
            />
            <div>
              <p className="font-medium">Student Name</p>
              <p className="text-sm text-gray-600">Computer Science</p>
            </div>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            Circular avatar with object-cover
          </p>
        </div>

        {/* Example 5: Image with placeholder */}
        <div className="border rounded-lg p-4">
          <h3 className="font-semibold mb-2">Image with Placeholder</h3>
          <Image
            src="/images/teacher1.jpg"
            alt="Teacher Avatar"
            width={200}
            height={150}
            className="rounded-lg"
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
          />
          <p className="text-sm text-gray-600 mt-2">
            Image with blur placeholder while loading
          </p>
        </div>

        {/* Example 6: Image with priority */}
        <div className="border rounded-lg p-4">
          <h3 className="font-semibold mb-2">Priority Image</h3>
          <Image
            src="/images/carer1.jpg"
            alt="Employee Avatar"
            width={200}
            height={150}
            className="rounded-lg"
            priority
          />
          <p className="text-sm text-gray-600 mt-2">
            Priority image for above-the-fold content
          </p>
        </div>

      </div>

      <div className="mt-8 p-4 bg-blue-50 rounded-lg">
        <h3 className="font-semibold text-blue-800 mb-2">Key Points for Next.js Images:</h3>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Always import Image from 'next/image'</li>
          <li>• Use relative paths starting with '/' for public folder images</li>
          <li>• Always provide width and height props (or use fill)</li>
          <li>• Use className for styling, not style prop for dimensions</li>
          <li>• Add alt text for accessibility</li>
          <li>• Use priority prop for above-the-fold images</li>
          <li>• Use placeholder="blur" for better loading experience</li>
        </ul>
      </div>
    </div>
  );
};

export default ImageExample; 