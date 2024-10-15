export default function ProfileId({ params }) {

    console.log(params.id);
    const id = params.id;
    return (
        <div>
            <h1 className="text-3xl font-bold text-center ">Profile ID {id}</h1>
        </div>
    )
}
