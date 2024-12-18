import React from 'react';

const PageNotFound = () => {
    return (
        <div className="flex items-center justify-center h-screen ">
            <div className="text-center p-8  rounded-lg   w-full ">
                <section class="page_404">
                    <div class="">
                        <div class="row">
                            <div class="col-sm-12 ">
                                <div class="col-sm-10 col-sm-offset-1  text-center">
                                    <div class="four_zero_four_bg">
                                        <h1 class="text-center ">404</h1>


                                    </div>

                                    <div class="contant_box_404">
                                        <h3 class="h2">
                                            Look like you're lost
                                        </h3>

                                        <p>the page you are looking for not avaible!</p>

                                        <a href="/login" class="link_404">Go to Home</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default PageNotFound;
