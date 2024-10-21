import Header from "@/components/Header";
import Login from "@/modules/login/Login";

const Index = (props) => {
    return (
        <div>
            <h1>Pikplay Laboratory</h1>
            {/* <Header /> */}
            <Login
                env="dev"
            />
        </div>
    );
}

export default Index;
