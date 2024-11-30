import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import instance, { getOne } from "../axios";
import Header from "../components/Header";

const DetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await getOne("/products", id);
        console.log(response);
        setProduct(response);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, []);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Header></Header>
      <section class="mt-[64px] product mp-fullpage-section-pad flex lg:flex-row flex-col xl:gap-[20px] lg:gap-[10px] gap-[20px] w-full">
        <div class="motion-preset-slide-right motion-delay-[300ms] list-img max-w-[80px] flex ">
          {product.images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt=""
              class="w-full object-cover max-w-[80px] h-[80px] "
            />
          ))}
        </div>
        <div
          id="detail-img"
          class="motion-preset-focus motion-delay-[300ms] relative detail-img 3xl:min-w-[770px] 2xl:min-w-[560px] xl:min-w-[460px] lg:min-w-[390px] 3xl:max-w-[770px] xl:max-w-[460px] 2xl:max-w-[560px] lg:max-w-[390px] w-full lg:order2 order-1"
        >
          <div class="hot absolute top-5 left-0 text-white bg-[#FF6962] font-semibold px-3.5 text-[14px] shadow shadow-xl"></div>
          <div class="new absolute top-[50px] left-0 text-white bg-[#6cff62] font-semibold px-3.5 text-[14px] shadow shadow-xl"></div>
          <img src={product.images[0]} alt="" class="w-full object-cover " />
        </div>
        <div class="motion-preset-focus motion-delay-[300ms] detail-info xl:pt-[40px] 3xl:px-[140px] xl:px-[60px] px-[20px] text-center flex flex-col items-center order-3">
          <h2 class="product-name xl:text-3xl text-2xl product-title">
            {product.title}
          </h2>
          <p class="product-description text-gray-500 mt-[32px] xl:text-md lg:text-sm max-w-[80%]"></p>
          <div class="rating mt-[12px]">
            <span class="product-rating"></span>
            <i class="fa-solid fa-star text-yellow-400"></i>
          </div>
          <div class="review mt-[12px]">
            <span class="lg:text-sm xl:text-md">
              (<span class="product-reviews"></span> customer reviews)
            </span>
          </div>
          <h3 class="product-price my-[50px] xl:text-3xl text-2xl">
            {product.price}$
          </h3>
          <div class="action w-full flex flex-row gap-[10px] h-[60px] lg:text-sm justify-center items-center flex-wrap mb-[40px]">
            <div></div>
            <div class="quantity p-5 border border-gray-200 select-none">
              <i class="fa-solid fa-minus cursor-pointer"></i>
              <input
                type="number"
                name="quantity"
                id="quantity"
                value="1"
                min="1"
                inputmode="numeric"
                class="border-0 outline-0 text-center sm:max-w-[50px] max-w-[30px] appearance-none no-spin"
              />
              <i class="fa-solid fa-plus cursor-pointer"></i>
            </div>
            <div class="add-to-card py-5 sm:px-8 px-4 mp-transition-3 cursor-pointer hover:bg-red-500 bg-black text-white flex flex-row gap-[10px] justify-center items-center">
              <i class="fa-solid fa-cart-shopping"></i>
              <span class="block">Add to cart</span>
              <i class="fa-solid fa-check"></i>
            </div>

            <div class="whist-list flex text-xl justify-center items-center cursor-pointer sm:block hidden">
              <i class="fa-regular fa-heart"></i>
            </div>
          </div>
          <button class="buy-now border w-[80%] bg-black text-white p-5 flex justify-center items-center hover:bg-red-500 hover:text-white transition-ease-in-out mp-transition-3">
            Buy now
          </button>
          <div class="category-detail py-[35px] mt-[60px] border-y border-gray-200 w-full">
            <h5 class="text-[13px] uppercase text-gray-500">
              Category:
              <span class="font-semibold text-black">Beauty</span>
            </h5>
          </div>
          <div class="share-ond flex flex-row gap-[20px] justify-center items-center py-[35px] text-[13px] text-gray-500">
            <div class="facebook mp-detail-share-link">
              <i class="fa-brands fa-facebook-f"></i>
              <span>Facebook</span>
            </div>
            <div class="twitter mp-detail-share-link">
              <i class="fa-brands fa-twitter"></i>
              <span>Twitter</span>
            </div>
            <div class="instagram mp-detail-share-link">
              <i class="fa-brands fa-instagram"></i>
              <span>Instagram</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default DetailPage;
