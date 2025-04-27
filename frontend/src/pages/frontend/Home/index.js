
import PolicySection from '../../../components/PolicySection';
import ProductNew from '../../../components/ProductNew';
import ProductBestseller from '../../../components/ProductBestseller';
import ProductSale from '../../../components/ProductSale';
import PostNew from '../../../components/PostNew';
import Banner from '../../../components/Banner';

const Home = () => {
    return (
        <>
            <main>
                <div className="mainslider">
                    <Banner/>
                </div>
                <div className="mainpolicy">
                    <PolicySection />
                </div>
                <div className="mainproductnew">
                    <ProductNew />
                </div>
                <div className="mainproductnew">
                    <ProductBestseller />
                </div>
                <div className="mainproductsale">
                    <ProductSale />
                </div>
                <div className="mainpostnew">
                    <PostNew />
                </div>
            </main>
        </>
    );
}
export default Home;