import { IoMdDoneAll } from "react-icons/io";
import { MdOutlinePendingActions } from "react-icons/md";
export default function Request(params) {
    // console.log(params);
    const { id, sessionId, userId, description, createdAt, updatedAt, state } = params.request;
    return (
        <div className="w-2/3 container mx-auto bg-green-600">
            <div className="hero bg-base-200 gap-5 place-content-start   ">
                <div className="hero-content flex-col lg:flex-row gap-10">
                    <img
                        src="https://img.freepik.com/premium-vector/students-classroom-teacher-near-blackboard-auditorium-teaches-maths-lesson-children-study-subject-kids-group-studying-elementary-primary-school-class-interior-cartoon-vector-flat-concept_176411-2393.jpg?w=900"
                        className=" rounded-lg shadow-2xl w-3/4 md:w-2/3 lg:w-1/4" />
                    <div className="w-full">
                        <h1 className="text-5xl font-bold text-center  md:text-center lg:text-start ">Session Request : {sessionId}</h1>
                        <p className="py-6 w-1/2">
                            {description}
                        </p>
                        <p> CreatedAt : {createdAt}</p>
                        <div className="flex items-center  ">


                            <p> Current State : {state}</p>
                            {/* <div className="w-2 h-2 ml-4 bg-green-500 rounded-full animate-blink mt-1 "></div> */}
                            {state === "Ongoing" && (
                                <div className="w-2 h-2 ml-4 bg-green-500 rounded-full animate-blink mt-1"></div>
                            )}

                            {state === "Pending" && (
                                <div className="ml-2">
                                    <MdOutlinePendingActions className="text-blue-400" />
                                </div>
                            )}

                            {state === "Finished" && (
                                <div className="ml-2">
                                    <IoMdDoneAll className="text-green-600" />
                                </div>

                            )}
                        </div>
                        <div className=" w-full">
                            {/* Push buttons to the right with ml-auto */}
                            <div className="ml-auto flex flex-col md:flex-row lg:flex-row ">
                                <button className="btn btn-success mr-5 w-full md:w-[200px] lg:w-[200px] ">Accept</button>
                                <button className="btn btn-error w-full md:w-[200px] lg:w-[200px] ">Decline</button>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    )
}
