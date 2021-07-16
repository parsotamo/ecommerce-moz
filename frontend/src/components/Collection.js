import React from 'react';

const Collection = ()=>{
    return (
<section className="collection my-5">
       <div className="container">
           <div className="row pt-4 mx-5 text-light">
               <div className="col-md-4 col-sm-6 col-12">
                <div className="card collection-card bg-light">
                    <img src="static/img/shop01.png" className="card-img collection-img" alt="" />
                    <div className="card-body collection-body">
                        <div className="p-3">
                            <h1 className="collection-title">Collecção de Computadores</h1>
                            <a href="#" className="collection-cta text-uppercase text-light">Compra agora <i className="fas fa-arrow-circle-right"></i></a>

                        </div>
                    </div>
                </div>
               </div>
               <div className="col-md-4 col-sm-6 col-12">
                <div className="card collection-card bg-light">
                    <img src="static/img/shop02.png" className="card-img collection-img" alt="" />
                    <div className="card-body collection-body">
                        <div className="p-3">
                            <h1 className="collection-title">Collecção de Cameras</h1>
                            <a href="#" className="collection-cta text-uppercase text-light">Compra agora <i className="fas fa-arrow-circle-right"></i></a>

                        </div>
                    </div>
                </div>
               </div>
               <div className="col-md-4 col-sm-6 col-12">
                <div className="card collection-card bg-light">
                    <img src="static/img/shop03.png" className="card-img collection-img" alt="" />
                    <div className="card-body collection-body">
                        <div className="p-3">
                            <h1 className="collection-title">Collecção de Acessórios</h1>
                            <a href="#" className="collection-cta text-uppercase text-light">Compra agora <i className="fas fa-arrow-circle-right"></i></a>

                        </div>
                    </div>
                </div>
               </div>
           </div>
       </div>
</section>
    );
}

export default Collection;
