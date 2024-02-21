import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
        <div
            className="w-75 mx-auto p-5 "
            style={{ borderRadius: 30, marginTop: 80 }}
        >
            <div className=" card border shadow-lg ">
                <div class="py-5">
                    <div class="container">
                        <div class="row mx-auto ">
                            
                            

                            <div class="col-md-3 mx-auto ">
                                <div
                                    style={{ height: 190 }}
                                    class="card text-center shadow-lg"
                                >
                                    <div class="card-block">
                                    <img
                                        style={{ height: 100, width: 110, marginTop: 10, marginBottom:10 }}
                                        class="card-img-top"
                                        src="https://cdn-icons-png.freepik.com/256/562/562460.png?ga=GA1.1.1391095079.1708452813"
                                        alt="Card image cap"
                                    />
                                    {/* <h4 class="card-title"></h4> */}
                                    <Link className="btn btn-primary" to={"/departments"}>
                                        Department Management
                                    </Link>
                                    </div>
                                </div>
                            </div>

                            <div class="col-md-3 mx-auto ">
                                <div
                                    style={{ height: 190 }}
                                    class="card text-center shadow-lg"
                                >
                                    <div class="card-block">
                                    <img
                                        style={{ height: 130, width: 130 }}
                                        class="card-img-top"
                                        src="https://cdn-icons-png.flaticon.com/512/476/476863.png"
                                        alt="Card image cap"
                                    />
                                    {/* <h4 class="card-title"></h4> */}
                                    <Link className="btn btn-primary" to={"/employees"}>
                                        User Management
                                    </Link>
                                    </div>
                                </div>
                            </div>

                            
                        </div>

                    <br></br>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default Home;