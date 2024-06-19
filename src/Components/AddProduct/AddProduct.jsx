import { useState } from 'react';
import './AddProduct.css';
import upload_area from '../../assets/upload_area.svg';

const AddProduct = () => {
    const [image, setImage] = useState(false);
    const [productDetails, setProductDetails] = useState({
        name: '',
        image: '',
        category: 'others',
        new_price: '',
        old_price: '',
        use: '',
        plants: '',
        ingredients: '',
        quantity: '',
    });

    const imageHandler = (e) => {
        setImage(e.target.files[0]);
    };

    const changeHandler = (e) => {
        setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
    };

    const Add_Product = async () => {
        // Log field values before submission
        console.log("Product Details:", productDetails);

        // Validate required fields
        if (
            !productDetails.name ||
            !productDetails.new_price ||
            !productDetails.old_price ||
            !productDetails.use ||
            !productDetails.plants ||
            !productDetails.ingredients ||
            !productDetails.quantity
        ) {
            alert('Please fill out all required fields.');
            return;
        }

        console.log("Validated Product Details:", productDetails);

        let responseData;

        let product = productDetails;

        let formData = new FormData();
        formData.append('product', image);

        await fetch('https://krushibajarbackend.onrender.com/upload', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
            },
            body: formData,
        })
            .then((resp) => resp.json())
            .then((data) => {
                responseData = data;
            });

        if (responseData.success) {
            product.image = responseData.image_url;
            console.log("Final Product Object to Send:", product);

            await fetch('https://krushibajarbackend.onrender.com/addproduct', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(product),
            })
                .then((resp) => resp.json())
                .then((data) => {
                    data.success ? alert('Product Added') : alert('Failed');
                });
        }
    };

    return (
        <div className="add-product">
            <div className="addproduct-itemfield">
                <p>Product title</p>
                <input value={productDetails.name} onChange={changeHandler} type="text" name="name" placeholder="Type Here..." />
            </div>

            <div className="addproduct-itemfield">
                <p>Ingredients</p>
                <input value={productDetails.ingredients} onChange={changeHandler} type="text" name="ingredients" placeholder="Type Here..." />
            </div>

            <div className="addproduct-itemfield">
                <p>Plants</p>
                <input value={productDetails.plants} onChange={changeHandler} type="text" name="plants" placeholder="Type Here..." />
            </div>

            <div className="addproduct-itemfield">
                <p>How To Use</p>
                <input value={productDetails.use} onChange={changeHandler} type="text" name="use" placeholder="Type Here..." />
            </div>

            <div className="addproduct-price">
                <div className="addproduct-itemfield">
                    <p>Price</p>
                    <input value={productDetails.old_price} onChange={changeHandler} type="text" name="old_price" placeholder="Type Here..." />
                </div>
                <div className="addproduct-itemfield">
                    <p>Offer Price</p>
                    <input value={productDetails.new_price} onChange={changeHandler} type="text" name="new_price" placeholder="Type Here..." />
                </div>
            </div>

            <div className="addproduct-itemfield">
                <p>Product Category</p>
                <select value={productDetails.category} onChange={changeHandler} name="category" className="add-product-selector">
                    <option value="insecticides">Insecticides</option>
                    <option value="fungicides">Fungicides</option>
                    <option value="tonics">Tonics</option>
                    <option value="fertilizers">Fertilizers</option>
                    <option value="others">Others</option>
                    <option value="new collections">New Collections</option>
                </select>
            </div>

            <div className="addproduct-itemfield">
                <p>Product Quantity</p>
                <select value={productDetails.quantity} onChange={changeHandler} name="quantity" className="add-product-selector">
                    <option value="30ml">30 ML</option>
                    <option value="100ml">100 ML</option>
                    <option value="250ml">250 ML</option>
                    <option value="400ml">400 ML</option>
                    <option value="500ml">500 ML</option>
                    <option value="1 litre">1 Litre</option>
                    <option value="15 litre">15 Litre</option>
                    <option value="1">1</option>
                    <option value="100gm">100 gm</option>
                    <option value="250gm">250 gm</option>
                    <option value="500gm">500 gm</option>
                    <option value="1kg">1 Kg</option>
                    <option value="3kg">3 Kg</option>
                    <option value="10kg">10 Kg</option>
                    <option value="25kg">25 kg</option>
                    <option value="30kg">30 kg</option>
                    <option value="45kg">45 kg</option>
                    <option value="50kg">50 kg</option>
                </select>
            </div>

            <div className="addproduct-itemfield">
                <label htmlFor="file-input">
                    <img className="addproduct-thumnail-img" src={image ? URL.createObjectURL(image) : upload_area} alt="" />
                </label>
                <input onChange={imageHandler} type="file" name="image" id="file-input" hidden />
            </div>
            <button onClick={Add_Product} className="addproduct-btn">
                ADD
            </button>
        </div>
    );
};

export default AddProduct;
