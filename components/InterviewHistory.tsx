"use client";

import { useEffect, useState } from 'react';
import { db } from '@/firebase/client';
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore';
import { format } from 'date-fns';

interface Interview {
  id: string;
  userName: string;
  timestamp: any;
  type: string;
  transcript: Array<{
    role: string;
    content: string;
  }>;
}

interface InterviewHistoryProps {
  userId: string;
}

const InterviewHistory = ({ userId }: InterviewHistoryProps) => {
  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInterviews = async () => {
      try {
        const interviewsRef = collection(db, 'interviews');
        const q = query(
          interviewsRef,
          where('userId', '==', userId),
          orderBy('timestamp', 'desc')
        );

        const querySnapshot = await getDocs(q);
        const interviewData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Interview[];

        setInterviews(interviewData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching interviews:', error);
        setLoading(false);
      }
    };

    if (userId) {
      fetchInterviews();
    }
  }, [userId]);

  if (loading) {
    return <div className="text-center py-4">Loading...</div>;
  }

  if (interviews.length === 0) {
    return <div className="text-center py-4">No interviews found</div>;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">Your Interview History</h2>
      <div className="grid gap-4">
        {interviews.map((interview) => (
          <div key={interview.id} className="border rounded-lg p-4 bg-white shadow-sm">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-medium">
                  {interview.type === 'generate' ? 'General Interview' : 'Technical Interview'}
                </h3>
                <p className="text-sm text-gray-500">
                  {interview.timestamp?.toDate() 
                    ? format(interview.timestamp.toDate(), 'PPpp')
                    : 'Date not available'}
                </p>
              </div>
            </div>
            <div className="mt-2">
              <p className="text-sm text-gray-600">
                {interview.transcript.length} messages exchanged
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InterviewHistory;
