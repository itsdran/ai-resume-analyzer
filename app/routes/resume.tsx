import React, { useEffect, useState } from 'react';
import {Link, useParams} from 'react-router';
import { usePuterStore } from '~/lib/puter';
import { useNavigate } from 'react-router';

export const meta = () => ([
    {title: 'ResumAInd | Review'},
    {name: 'description', content: 'Detailed review of your resume.'},
])

const Resume = () => {
    const {auth, isLoading, fs, kv} = usePuterStore();
    const {id} = useParams();
    const [imageUrl, setImageUrl] = useState('');
    const [resumeUrl, setResumeUrl] = useState('');
    const [feedback, setFeedback] = useState('');
    const navigate = useNavigate();

    useEffect (() => {
        const loadResume = async () => {
            const resume = await kv.get(`resume/${id}`);

            if (!resume) return;

            const data = JSON.parse(resume);

            const resumeBlob = await fs.read(data.resumePath);
            if (!resumeBlob) return;

            const pdfBlob = new Blob ([resumeBlob], {type: 'application/pdf'});
            const resumeUrl = URL.createObjectURL (pdfBlob);
            setResumeUrl(resumeUrl);

            const imageBlob = await fs.read(data.imagePath);
            if (!imageBlob) return;

            const imageUrl = URL.createObjectURL (imageBlob);
            setImageUrl(imageUrl);

            setFeedback(data.feedback);
            console.log(resumeUrl, imageUrl, feedback);
        } 

        loadResume();

    }, [id]);

    return (
        <main className="!pt-0">
            <nav className="resume-nav">
                <Link to="/" className="back-button">
                    <img src="/icons/back.svg" alt="logo" className="w-2.5 h-2.5"/>
                    <span className="text-gray-500 text-sm font-semibold">Back to Homepage</span>
                </Link>
            </nav>
            <div className="flex flex-row w-full max-lg:flex-col-reverse">
                <section className="feedback-section bg-[url('/images/bg-small.svg')] bg-cover h-[100vh] sticky top-0 items-center justify-center">
                    {imageUrl && resumeUrl && (
                        <div className=" animate-in fade-in duration-1000 gradient-border max-sm:m-0 h-[90%] max-wxl:h-fit w-fit">
                            <a>
                                <img src={imageUrl} className="w-full h-full object-contain rounded-2xl" title="resume"/>
                            </a>
                        </div>
                    )}
                </section>
            </div>
        </main>
    );

}
export default Resume;