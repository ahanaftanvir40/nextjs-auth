

function page({ params }: any) {


    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Welcome To your Profile</h1>
            <hr />
            <p>{params.id}</p>
        </div>
    )
}

export default page
