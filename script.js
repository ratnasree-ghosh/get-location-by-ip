var main_div = document.getElementsByClassName("main")[0];

var btn = document.getElementById("btn");
var second_main = document.getElementById("second-main");
var input = document.getElementById("ip");
var lat = document.getElementById("lat");
var long = document.getElementById("long");
var city = document.getElementById("city");
var reg = document.getElementById("reg");
var org = document.getElementById("org");
var host = document.getElementById("host");
var map = document.getElementById("map");
var time_zone = document.getElementById("time-zone");
var date_time = document.getElementById("date-time");
var pin = document.getElementById("pin");
var msg = document.getElementById("msg");
var post_section = document.getElementById("postSection");
var search = document.getElementById("search");
var IP, latitude, longitude, pincode;

var postOfiices = [];

fetch("https://api.ipify.org?format=json")
.then((res)=>res.json())
.then((data)=> {console.log(data.ip)
                input.value = data.ip;
                IP = data.ip;
}).catch((e)=>{
    console.log("Error while fetching Ip address",e);
})

btn.addEventListener("click", ()=>{
    
    setTimeout(()=>{
        fetch(`https://ipinfo.io/${IP}/geo?token=094671daf11747`)
        .then((res)=> res.json())
        .then((data)=>{
            console.log(data);
            

            let location=data.loc;
            latitude = location.split(',')[0];
            longitude = location.split(',')[1];
            lat.innerHTML = `<strong>Lat: </strong>${latitude}`;
            long.innerHTML = `<strong>Long: </strong>${longitude}`;
            city.innerHTML = `<strong>city:</strong> ${data.city}`;
            reg.innerHTML = `<strong>Region:</strong> ${data.region}`;
            org.innerHTML = `<strong>Organisation:</strong> ${data.org}`;
            host.innerHTML = `<strong>Hostname:</strong> ${data.hostname}`;
            

            map.innerHTML = `<iframe src="https://maps.google.com/maps?q= ${latitude}, ${longitude}&output=embed" width="1000" height="370" frameborder="0" style="border:0"></iframe>
            `;

            time_zone.innerHTML = `<strong>Time Zone:</strong> ${data.timezone}`;
            let dateTime = new Date().toLocaleString("en-US", { timeZone: data.timezone });
            date_time.innerHTML = `<strong>Date and Time:</strong> ${dateTime} `;
            pincode = data.postal;
            pin.innerHTML = `<strong>Pincode:</strong> ${data.postal}`;


        search.addEventListener("input", ()=>{
            var searchVal = search.value;
            searchVal = searchVal.toLowerCase().trim();
            post_section.innerHTML ="";
            console.log(searchVal);

         let newArray =   postOfiices.filter((item)=>{
            var testN = item.Name.toLowerCase();
            var testB = item.BranchType.toLowerCase();

                return (testN.includes(searchVal) || testB.includes(searchVal));
            })

            console.log(newArray);

            if(newArray.length==0){
                post_section.innerHTML = `<h1>No Result Found!</h1>`
            }

            newArray.forEach((el)=>{
                post_section.innerHTML += `
                <div class="post">
                    <h3 class="info">Name: <strong>${el.Name}</strong><h3>
                    <h3>Branch Type: <strong>${el.BranchType}</strong><h3>
                    <h3>Delivery Status: <strong> ${el.DeliveryStatus}</strong><h3>
                    <h3>District: <strong>${el.District}</strong><h3>
                    <h3>Division: <strong>${el.Division}</strong><h3>

                </div>
                `  
            })
                
            })

            fetch(`https://api.postalpincode.in/pincode/${pincode}`)
            .then((res)=>res.json())
            .then((post)=>{
                // console.log("posts", post[0].PostOffice);
                msg.innerHTML = `<strong>Message:</strong> ${post[0].Message}`;

                var arr = post[0].PostOffice;
                arr.forEach((item)=> postOfiices.push(item));

                console.log(postOfiices);

                post_section.innerHTML = "";
                postOfiices.forEach((item)=>{
                    post_section.innerHTML += `
                    <div class="post">
                        <h3 class="info">Name: <strong>${item.Name}</strong><h3>
                        <h3>Branch Type: <strong>${item.BranchType}</strong><h3>
                        <h3>Delivery Status: <strong> ${item.DeliveryStatus}</strong><h3>
                        <h3>District: <strong>${item.District}</strong><h3>
                        <h3>Division: <strong>${item.Division}</strong><h3>

                    </div>
                    ` 
                })
            })

            
        })
    }, 1000);

    main_div.style.display = "none";
    second_main.style.display = "block";



    


})