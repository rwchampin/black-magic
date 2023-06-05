"use client";
import { Image } from 'next/image'
export default function Page(){

    return (
<>
<header role="banner" aria-label="Heading">
  <div className="header">
    <div className="_cont">
      <div className="shadow">
        <a className="logo" title="Home" href='https://github.com/greenwoodents/quickbeam.js'>Quickbeam.js Demo</a>
      </div>
      <div className="mobile-menu">
        <form action="/search" method="get" id="find">
          <div>
            <input type="text" name="q" id="find-input" className="find-input" placeholder="Search..." value="" />
            <button type="submit" title="Search" id="find-btn">Search</button>
          </div>
        </form>
        <a id="customer_login_link">Sign In</a>
        {/* <nav role="navigation" aria-label="Catalog">
          <ul>
            <li className="nc nav-li-category">
              <a className="nc nav-category" data-subcategories="1">Women</a>
              <ul className="nc">
              </ul>
            </li>
            <li className="nc nav-li-category">
              <a className="nc nav-category" data-subcategories="1">Men</a>
              <ul className="nc">
              </ul>
            </li>
          </ul>
        </nav> */}
      </div>
      <span id="nav-icon"></span>
    </div>
  </div>
  <div className="breadcrumb" role="navigation" aria-label="Breadcrumbs">
    <div className="_cont">
      <ol>
        <li><a title="Back to the frontpage">Home</a></li>
        <li><a title="">Men</a></li>
        <li>Tony Hunfinger T-Shirt New York</li>
      </ol>
    </div>
  </div>
</header>
<section aria-label="Main content" role="main" className="product-detail">
  <div itemscope itemtype="http://schema.org/Product">
    <meta itemprop="url" content="http://html-koder-test.myshopify.com/products/tommy-hilfiger-t-shirt-new-york" />
    <meta itemprop="image" content="//cdn.shopify.com/s/files/1/1047/6452/products/product_grande.png?v=1446769025" />
    <div className="shadow">
        <div className="_cont detail-top">
            <div className="cols">
                <div className="left-col">
                    <div className="thumbs">
                    <a className="thumb-image active" href="//cdn.shopify.com/s/files/1/1047/6452/products/product_1024x1024.png?v=1446769025" data-index="0">
                        <span><Image fill src="//cdn.shopify.com/s/files/1/1047/6452/products/product_150x150.png?v=1446769025" alt="Tommy Hilfiger T-Shirt New York" /></span>
                    </a>
                    <a className="thumb-image" href="//cdn.shopify.com/s/files/1/1047/6452/products/tricko1_1024x1024.jpg?v=1447104179" data-index="1">
                        <span><Image fill src="//cdn.shopify.com/s/files/1/1047/6452/products/tricko1_150x150.jpg?v=1447104179" alt="Tommy Hilfiger T-Shirt New York"/></span>
                    </a>
                    <a className="thumb-image" href="//cdn.shopify.com/s/files/1/1047/6452/products/tricko2_1024x1024.jpg?v=1447104180" data-index="2">
                        <span><Image fill src="//cdn.shopify.com/s/files/1/1047/6452/products/tricko2_150x150.jpg?v=1447104180" alt="Tommy Hilfiger T-Shirt New York"/></span>
                    </a>
                    <a className="thumb-image" href="//cdn.shopify.com/s/files/1/1047/6452/products/tricko3_1024x1024.jpg?v=1447104182" data-index="3">
                        <span><Image fill src="//cdn.shopify.com/s/files/1/1047/6452/products/tricko3_150x150.jpg?v=1447104182" alt="Tommy Hilfiger T-Shirt New York"/></span>
                    </a>
                    </div>
                    <div className="big">
                    <span id="big-image" className="Image fill" quickbeam="image" style={{backgroundImage: "url('//cdn.shopify.com/s/files/1/1047/6452/products/product_1024x1024.png?v=1446769025')" }} data-src="//cdn.shopify.com/s/files/1/1047/6452/products/product_1024x1024.png?v=1446769025"></span>
                    <div id="banner-gallery" className="swipe">
                        <div className="swipe-wrap">
                        <div style={{backgroundImage: "url('//cdn.shopify.com/s/files/1/1047/6452/products/product_large.png?v=1446769025')" }}></div>
                        <div style={{backgroundImage: "url('//cdn.shopify.com/s/files/1/1047/6452/products/tricko1_large.jpg?v=1447104179')" }}></div>
                        <div style={{backgroundImage: "url('//cdn.shopify.com/s/files/1/1047/6452/products/tricko2_large.jpg?v=1447104180')" }}></div>
                        <div style={{backgroundImage: "url('//cdn.shopify.com/s/files/1/1047/6452/products/tricko3_large.jpg?v=1447104182')" }}></div>
                        </div>
                    </div>
                    <div className="detail-socials">
                        <div className="social-sharing" data-permalink="http://html-koder-test.myshopify.com/products/tommy-hilfiger-t-shirt-new-york">
                        <a target="_blank"  className="share-facebook" title="Share"></a>
                        <a target="_blank"  className="share-twitter" title="Tweet"></a>
                        <a target="_blank"  className="share-pinterest" title="Pin it"></a>
                        </div>
                    </div>
                    </div>
                </div>
                <div className="right-col">
                    <h1 itemprop="name">Tony Hunfinger T-Shirt New York</h1>
                    <div itemprop="offers" itemscope itemtype="http://schema.org/Offer">
                    <meta itemprop="priceCurrency" content="USD" />
                    <link itemprop="availability" href="http://schema.org/InStock" />
                    <div className="price-shipping">
                        <div className="price" id="price-preview" quickbeam="price" quickbeam-price="800">
                        $800.00
                        </div>
                        <a>Free shipping</a>
                    </div>
                    <div className="swatches">
                        <div className="swatch clearfix" data-option-index="0">
                        <div className="header">Size</div>
                        <div data-value="M" className="swatch-element plain m available">
                            <input id="swatch-0-m" type="radio" name="option-0" value="M" checked  />
                            <label for="swatch-0-m">
                            M
                            <Image fill className="crossed-out" src="//cdn.shopify.com/s/files/1/1047/6452/t/1/assets/soldout.png?10994296540668815886" />
                            </label>
                        </div>
                        <div data-value="L" className="swatch-element plain l available">
                            <input id="swatch-0-l" type="radio" name="option-0" value="L"  />
                            <label for="swatch-0-l">
                            L
                            <Image fill className="crossed-out" src="//cdn.shopify.com/s/files/1/1047/6452/t/1/assets/soldout.png?10994296540668815886" />
                            </label>
                        </div>
                        <div data-value="XL" className="swatch-element plain xl available">
                            <input id="swatch-0-xl" type="radio" name="option-0" value="XL"  />
                            <label for="swatch-0-xl">
                            XL
                            <Image fill className="crossed-out" src="//cdn.shopify.com/s/files/1/1047/6452/t/1/assets/soldout.png?10994296540668815886" />
                            </label>
                        </div>
                        <div data-value="XXL" className="swatch-element plain xxl available">
                            <input id="swatch-0-xxl" type="radio" name="option-0" value="XXL"  />
                            <label for="swatch-0-xxl">
                            XXL
                            <Image fill className="crossed-out" src="//cdn.shopify.com/s/files/1/1047/6452/t/1/assets/soldout.png?10994296540668815886" />
                            </label>
                        </div>
                        </div>
                        <div className="swatch clearfix" data-option-index="1">
                        <div className="header">Color</div>
                        <div data-value="Blue" className="swatch-element color blue available">
                            <div className="tooltip">Blue</div>
                            <input quickbeam="color" id="swatch-1-blue" type="radio" name="option-1" value="Blue" checked  />
                            <label for="swatch-1-blue" style={{borderColor: "blue"}}>
                            <Image fill className="crossed-out" src="//cdn.shopify.com/s/files/1/1047/6452/t/1/assets/soldout.png?10994296540668815886" />
                            <span style={{backgroundColor: "blue"}}></span>
                            </label>
                        </div>
                        <div data-value="Red" className="swatch-element color red available">
                            <div className="tooltip">Red</div>
                            <input quickbeam="color" id="swatch-1-red" type="radio" name="option-1" value="Red"  />
                            <label for="swatch-1-red" style={{borderColor: "red"}}>
                            <Image fill className="crossed-out" src="//cdn.shopify.com/s/files/1/1047/6452/t/1/assets/soldout.png?10994296540668815886" />
                            <span style={{backgroundColor: "red"}}></span>
                            </label>
                        </div>
                        <div data-value="Yellow" className="swatch-element color yellow available">
                            <div className="tooltip">Yellow</div>
                            <input quickbeam="color" id="swatch-1-yellow" type="radio" name="option-1" value="Yellow"  />
                            <label for="swatch-1-yellow" style={{borderColor: "yellow"}}>
                            <Image fill className="crossed-out" src="//cdn.shopify.com/s/files/1/1047/6452/t/1/assets/soldout.png?10994296540668815886" />
                            <span style={{backgroundColor: "yellow"}}></span>
                            </label>
                        </div>
                        </div>
                        <div className="guide">
                        <a>Size guide</a>
                        </div>
                    </div>

                    <form id="AddToCartForm">
                        <select name="id" id="productSelect" quickbeam="product" className="product-single__variants">
                        <option  selected="selected"  data-sku="" value="7924994501">
                            M / Blue - $800.00 USD
                        </option>
                        <option  data-sku="" value="7924995077">
                            M / Red - $850.00 USD
                        </option>
                        <option  data-sku="" value="7924994437">
                            L / Blue - $850.00 USD
                        </option>
                        <option  data-sku="" value="7924994693">
                            L / Yellow - $850.00 USD
                        </option>
                        <option  data-sku="" value="7924995013">
                            L / Red - $850.00 USD
                        </option>
                        <option  data-sku="" value="7924994373">
                            XL / Blue - $900.00 USD
                        </option>
                        <option  data-sku="" value="7924994629">
                            XL / Yellow - $850.00 USD
                        </option>
                        <option  data-sku="" value="7924830021">
                            XXL / Blue - $950.00 USD
                        </option>
                        <option  data-sku="" value="7924994885">
                            XXL / Red - $850.00 USD
                        </option>
                        </select>
                        <div className="btn-and-quantity-wrap">
                        <div className="btn-and-quantity">
                            <div className="spinner">
                            <span className="btn minus" data-id="2721888517"></span>
                            <input type="text" id="updates_2721888517" name="quantity" value="1" className="quantity-selector" />
                            <input type="hidden" id="product_id" name="product_id" value="2721888517" />
                            <span className="q">Qty.</span>
                            <span className="btn plus" data-id="2721888517"></span>
                            </div>
                            <div id="AddToCart" quickbeam="add-to-cart">
                            <span id="AddToCartText">Add to Cart</span>
                            </div>
                        </div>
                        </div>
                    </form>
                    <div className="tabs">
                        <div className="tab-labels">
                        <span data-id="1" className="active">Info</span>
                        <span data-id="2">Brand</span>
                        </div>
                        <div className="tab-slides">
                        <div id="tab-slide-1" itemprop="description"  className="slide active">
                            We open source it for you https://github.com/greenwoodents/quickbeam.js if you want to use it on your ecommerce.
                        </div>
                        <div id="tab-slide-2" className="slide">
                            Tony Hunfinger
                        </div>
                        </div>
                    </div>
                    <div className="social-sharing-btn-wrapper">
                        <span id="social_sharing_btn">Share</span>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <aside className="related">
      <div className="_cont">
        <h2>You might also like</h2>
        <div className="collection-list cols-4" id="collection-list" data-products-per-page="4">
          <a className="product-box">
            <span className="Image fill">
              <span style={{backgroundImage: "url('//cdn.shopify.com/s/files/1/1047/6452/products/tricko1_70d2887b-ec6a-4bcb-a93b-7fd1783e6445_grande.jpg?v=1447530130')" }} className="i first"></span>
              <span className="i second" style={{backgroundImage: "url('//cdn.shopify.com/s/files/1/1047/6452/products/product_030f9fc5-f253-4dca-a43a-fe2b719d0704_grande.png?v=1447530130')" }}></span>
            </span>
            <span className="text">
              <strong>Tony Hunfinger T-Shirt New York 2</strong>
              <span>
                From $800.00
              </span>
              <div className="variants">
                <div className="variant">
                  <div className="var m available">
                    <div className="t">M</div>
                  </div>
                  <div className="var l available">
                    <div className="t">L</div>
                  </div>
                  <div className="var xl available">
                    <div className="t">XL</div>
                  </div>
                  <div className="var xxl available">
                    <div className="t">XXL</div>
                  </div>
                </div>
                <div className="variant">
                  <div className="var color blue available">
                    <div className="c" style={{backgroundColor: "blue" }}></div>
                  </div>
                  <div className="var color red available">
                    <div className="c" style={{backgroundColor: "red" }}></div>
                  </div>
                  <div className="var color yellow available">
                    <div className="c" style={{backgroundColor: "yellow" }}></div>
                  </div>
                </div>
              </div>
            </span>
          </a>
          <a className="product-box">
            <span className="Image fill">
              <span style={{backgroundImage: "url('//cdn.shopify.com/s/files/1/1047/6452/products/tricko2_357767df-d7ff-4b58-b705-edde76bb32b7_grande.jpg?v=1447530150')" }} className="i first"></span>
              <span className="i second" style={{backgroundImage: "url('//cdn.shopify.com/s/files/1/1047/6452/products/tricko1_613d5776-ea61-4f9b-abef-0ce847c63a67_grande.jpg?v=1447530150')" }}></span>
            </span>
            <span className="text">
              <strong>Tony Hunfinger T-Shirt New York 3</strong>
              <span>
                From $800.00
              </span>
              <div className="variants">
                <div className="variant">
                  <div className="var m available">
                    <div className="t">M</div>
                  </div>
                  <div className="var l available">
                    <div className="t">L</div>
                  </div>
                  <div className="var xl available">
                    <div className="t">XL</div>
                  </div>
                  <div className="var xxl available">
                    <div className="t">XXL</div>
                  </div>
                </div>
                <div className="variant">
                  <div className="var color blue available">
                    <div className="c" style={{backgroundColor: "blue" }}></div>
                  </div>
                  <div className="var color red available">
                    <div className="c" style={{backgroundColor: "red" }}></div>
                  </div>
                  <div className="var color yellow available">
                    <div className="c" style={{backgroundColor: "yellow" }}></div>
                  </div>
                </div>
              </div>
            </span>
          </a>
          <a href="/collections/men/products/copy-of-copy-of-copy-of-tommy-hilfiger-t-shirt-new-york-4" className="product-box">
            <span className="Image fill">
              <span style={{backgroundImage: "url('//cdn.shopify.com/s/files/1/1047/6452/products/tricko3_0e98498a-123c-4305-9d94-d8280bb46416_grande.jpg?v=1447530164')" }} className="i first"></span>
              <span className="i second" style={{backgroundImage: "url('//cdn.shopify.com/s/files/1/1047/6452/products/tricko2_6c949188-dba0-4789-9434-c0821b92f3f4_grande.jpg?v=1447530164')" }}></span>
            </span>
            <span className="text">
              <strong>Tony Hunfinger T-Shirt New York 4</strong>
              <span>
                From $800.00
              </span>
              <div className="variants">
                <div className="variant">
                  <div className="var m available">
                    <div className="t">M</div>
                  </div>
                  <div className="var l available">
                    <div className="t">L</div>
                  </div>
                  <div className="var xl available">
                    <div className="t">XL</div>
                  </div>
                  <div className="var xxl available">
                    <div className="t">XXL</div>
                  </div>
                </div>
                <div className="variant">
                  <div className="var color blue available">
                    <div className="c" style={{backgroundColor: "blue" }}></div>
                  </div>
                  <div className="var color red available">
                    <div className="c" style={{backgroundColor: "red" }}></div>
                  </div>
                  <div className="var color yellow available">
                    <div className="c" style={{backgroundColor: "yellow" }}></div>
                  </div>
                </div>
              </div>
            </span>
          </a>
          <a className="product-box">
            <span className="Image fill">
              <span style={{backgroundImage: "url('//cdn.shopify.com/s/files/1/1047/6452/products/product_7d606126-1b60-4738-99b3-062810f2db8b_grande.png?v=1447530674')" }} className="i first"></span>
              <span className="i second" style={{backgroundImage: "url('//cdn.shopify.com/s/files/1/1047/6452/products/tricko3_fd08d231-654c-4304-81b2-9191e6fd141e_grande.jpg?v=1447530674')" }}></span>
            </span>
            <span className="text">
              <strong>Tony Hunfinger T-Shirt New York 5</strong>
              <span>
                From $800.00
              </span>
              <div className="variants">
                <div className="variant">
                  <div className="var m available">
                    <div className="t">M</div>
                  </div>
                  <div className="var l available">
                    <div className="t">L</div>
                  </div>
                  <div className="var xl available">
                    <div className="t">XL</div>
                  </div>
                  <div className="var xxl available">
                    <div className="t">XXL</div>
                  </div>
                </div>
                <div className="variant">
                  <div className="var color blue available">
                    <div className="c" style={{backgroundColor: "blue" }}></div>
                  </div>
                  <div className="var color red available">
                    <div className="c" style={{backgroundColor: "red" }}></div>
                  </div>
                  <div className="var color yellow available">
                    <div className="c" style={{backgroundColor: "yellow" }}></div>
                  </div>
                </div>
              </div>
            </span>
          </a>
          <a className="product-box hidden">
            <span className="Image fill">
              <span style={{backgroundImage: "url('//cdn.shopify.com/s/files/1/1047/6452/products/tricko1_bba77d82-7f85-47af-9a45-f4700bcc04ad_grande.jpg?v=1447530689')" }} className="i first"></span>
              <span className="i second" style={{backgroundImage: "url('//cdn.shopify.com/s/files/1/1047/6452/products/product_f065e961-d296-48a8-8a67-a3532200e257_grande.png?v=1447530689')" }}></span>
            </span>
            <span className="text">
              <strong>Tony Hunfinger T-Shirt New York 6</strong>
              <span>
                From $800.00
              </span>
              <div className="variants">
                <div className="variant">
                  <div className="var m available">
                    <div className="t">M</div>
                  </div>
                  <div className="var l available">
                    <div className="t">L</div>
                  </div>
                  <div className="var xl available">
                    <div className="t">XL</div>
                  </div>
                  <div className="var xxl available">
                    <div className="t">XXL</div>
                  </div>
                </div>
                <div className="variant">
                  <div className="var color blue available">
                    <div className="c" style={{backgroundColor: "blue" }}></div>
                  </div>
                  <div className="var color red available">
                    <div className="c" style={{backgroundColor: "red" }}></div>
                  </div>
                  <div className="var color yellow available">
                    <div className="c" style={{backgroundColor: "yellow" }}></div>
                  </div>
                </div>
              </div>
            </span>
          </a>
          <a className="product-box hidden">
            <span className="Image fill">
              <span style={{backgroundImage: "url('//cdn.shopify.com/s/files/1/1047/6452/products/tricko2_bf59c7f2-7c1f-4822-9494-6a984598a56c_grande.jpg?v=1447530706')" }} className="i first"></span>
              <span className="i second" style={{backgroundImage: "url('//cdn.shopify.com/s/files/1/1047/6452/products/tricko1_c6fa0fc1-99a0-4bd0-a1d8-0270127977fc_grande.jpg?v=1447530706')" }}></span>
            </span>
            <span className="text">
              <strong>Tony Hunfinger T-Shirt New York 7</strong>
              <span>
                From $800.00
              </span>
              <div className="variants">
                <div className="variant">
                  <div className="var m available">
                    <div className="t">M</div>
                  </div>
                  <div className="var l available">
                    <div className="t">L</div>
                  </div>
                  <div className="var xl available">
                    <div className="t">XL</div>
                  </div>
                  <div className="var xxl available">
                    <div className="t">XXL</div>
                  </div>
                </div>
                <div className="variant">
                  <div className="var color blue available">
                    <div className="c" style={{backgroundColor: "blue" }}></div>
                  </div>
                  <div className="var color red available">
                    <div className="c" style={{backgroundColor: "red" }}></div>
                  </div>
                  <div className="var color yellow available">
                    <div className="c" style={{backgroundColor: "yellow" }}></div>
                  </div>
                </div>
              </div>
            </span>
          </a>
        </div>
        <div className="more-products" id="more-products-wrap">
          <span id="more-products" data-rows_per_page="1">More products</span>
        </div>
      </div>
    </aside>
  </div>
</section>
<footer role="contentinfo" aria-label="Footer">
  <div className="_cont">
    <div className="socials">
      <strong>follow us:</strong>
      <ul>
        <li><a  title="html-koder / test on Twitter" className="tw" target="_blank">Twitter</a></li>
        <li><a  title="html-koder / test on Facebook" className="fb" target="_blank">Facebook</a></li>
        <li><a  title="html-koder / test on Instagram" className="in" target="_blank">Instagram</a></li>
        <li><a  title="html-koder / test on Pinterest" className="pi" target="_blank">Pinterest</a></li>
      </ul>
    </div>
    <div className="top">
      <div className="right">
        <form method="post" action="/contact" className="contact-form" accept-charset="UTF-8">
          <input type="hidden" value="customer" name="form_type" /><input type="hidden" name="utf8" value="✓" />
          <div>
            <input type="hidden" id="contact_tags" name="contact[tags]" value="newsletter"/>
            <input type="text" id="contact_email" name="contact[email]" placeholder="Submit e-mail for special offers..." />
            <button type="submit" title="Newsletter Signup">OK</button>
          </div>
        </form>
      </div>
      <div className="left">
        <span className="phone">+420 123 456 789</span>
        <a className="mail" href="mailto:email.from@settings.com">email.from@settings.com</a>
      </div>
    </div>
    <div className="bottom">
      <div className="left">
        <nav role="navigation" aria-label="Service menu">
          <ul>
            <li><a >Lorem ipsum</a></li>
            <li><a >About Us</a></li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
</footer>



<div id="quick-cart" quickbeam="cart">
  <a id="quick-cart-pay" quickbeam="cart-pay" className="cart-ico">
    <span>
      <strong className="quick-cart-text">Pay<br/></strong>
      <span id="quick-cart-price">0</span>
      <span id="quick-cart-pay-total-count">0</span>
    </span>
  </a>
</div>
</>

    );

}