import NavigationBar from "../components/navigation/NavigationBar";

const NotFoundPage = () => {
    return (
        <div className="d-flex flex-column h-100">

        <NavigationBar />

        <div className="mt-5 text-center">
            <h1>Page Not Found</h1>
        </div>

        </div>
    );
}

export default NotFoundPage;
