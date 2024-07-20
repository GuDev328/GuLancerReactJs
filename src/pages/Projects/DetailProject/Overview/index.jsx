import React from "react";
import { Chip } from "@material-tailwind/react";

const OverviewProject = () => {
    return (
        <div className="text-[15px]">
            <div>
                Im seeking a skilled web developer to create a comprehensive
                tutoring website. The primary purpose of this platform is to
                facilitate client-to-client tutoring services, accommodating
                users of all ages, from elementary students to adults. The
                website needs to be intuitive and user-friendly, fostering
                seamless interactions between students and tutors. It should
                include features like: - Live Tutorial Sessions: Real-time
                connections between tutors and students. - Recorded Tutorial
                Lessons: An archive of pre-recorded lessons for self-paced
                learning. - Interactive Quizzes: Engaging tools to evaluate the
                learners understanding of the topics. - Peer-to-Peer Learning: A
                unique feature to encourage student-to-student tutorial
                sessions. Added functionalities such as a robust search engine
                for tutor profiles, a secure payment system, and a user-friendly
                interface for scheduling and booking sessions will be
                appreciated. Ideal candidates should demonstrate previous
                experience developing educational platforms or similar websites
                with interactive features. A strong understanding of UI/UX
                principles and a proactive nature to suggest improvements or
                features that would enhance the overall user experience is
                desired.
            </div>
            <div className="flex flex-wrap">
                <p className="font-bold m-1">Công nghệ: </p>
                <Chip variant="ghost" className="m-1" value="NodeJS" />
                <Chip variant="ghost" className="m-1" value="ReactJs" />
                <Chip variant="ghost" className="m-1" value="NodeJS" />
                <Chip variant="ghost" className="m-1" value="ReactJs" />
                <Chip variant="ghost" className="m-1" value="NodeJS" />
                <Chip variant="ghost" className="m-1" value="ReactJs" />
                <Chip variant="ghost" className="m-1" value="NodeJS" />
                <Chip variant="ghost" className="m-1" value="ReactJs" />
                <Chip variant="ghost" className="m-1" value="NodeJS" />
                <Chip variant="ghost" className="m-1" value="ReactJs" />
                <Chip variant="ghost" className="m-1" value="NodeJS" />
                <Chip variant="ghost" className="m-1" value="ReactJs" />
                <Chip variant="ghost" className="m-1" value="NodeJS" />
                <Chip variant="ghost" className="m-1" value="ReactJs" />
                <Chip variant="ghost" className="m-1" value="NodeJS" />
                <Chip variant="ghost" className="m-1" value="ReactJs" />
                <Chip variant="ghost" className="m-1" value="NodeJS" />
                <Chip variant="ghost" className="m-1" value="ReactJs" />
                <Chip variant="ghost" className="m-1" value="NodeJS" />
                <Chip variant="ghost" className="m-1" value="ReactJs" />
                <Chip variant="ghost" className="m-1" value="NodeJS" />
                <Chip variant="ghost" className="m-1" value="ReactJs" />
            </div>
            <p className="mt-2 ">
                <strong>Ngày bắt đầu dự án:</strong> 1/1/1111
            </p>
            <p className="mt-2 ">
                <strong>Ngày dự kiến kết thúc dự án:</strong> 1/2/1111
            </p>
        </div>
    );
};

export default OverviewProject;
