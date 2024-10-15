export default function ActiveSessions(props) {
    const { id, instructor, topic, price, photoUrl } = props;
    return (
        <div className="flex flex-col md:flex-row">

            <div className="card flex-col md:flex-row lg:flex-row flex-1 card-side bg-base-100 shadow-xl  ">
                <figure className="w-full md:w-1/3 h-1/2 md:h-full lg:h-full ">
                    <img
                        src={photoUrl}
                        alt="Movie" />
                </figure>
                <div className="card-body">
                    <h2 className="card-title">{instructor}</h2>
                    <p> Expertise : {topic}</p>
                    <p >Price: <span className="text-yellow-700">{price}</span></p>
                    <div className="card-actions justify-end">
                        <button className="btn btn-success ">Request Sessions</button>

                    </div>
                </div>
            </div>

        </div>
    )
}
