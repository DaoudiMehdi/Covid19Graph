var ctx = document.getElementById('myChart').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Covid19',
            data: [],
            backgroundColor: [
            ],
            borderColor: [

            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});
function clicked(e){
    let countr= e.target.getAttribute('id')
    let httpReq2 = new XMLHttpRequest()
    httpReq2.open("GET" , "https://api.covid19api.com/dayone/country/"+countr, true)
    httpReq2.onreadystatechange = function(){
        if(httpReq2.readyState==4 && httpReq2.status==200){
            let raw = JSON.parse(httpReq2.response)
            let labels=raw.map(e=>{
                let d = new Date(e.Date)
                day=d.getDate();
                month=d.getMonth()+1;
                return ''+day+'/'+month
            })
            let confirmed = raw.map (e=>e.Confirmed)
            let recovered = raw.map (e=>e.Recovered)
            let deaths = raw.map (e=>e.Deaths)
            let active = raw.map (e=>e.Active)
            let datasets=[
                {
                    label : "Cas",
                    data : confirmed,
                    borderColor : "Red"
                },
                {
                    label : "Guéries",
                    data : recovered,
                    borderColor : "green"
                },
                {
                    label : "Décès",
                    data : deaths,
                    borderColor : "black"

                },
                {
                    label : "Actives",
                    data : active,
                    borderColor : "yellow"
                },

            ]
            myChart.data.labels=labels
            myChart.data.datasets=datasets;
            myChart.update()
            }
        
    }
    httpReq2.send()
}
var list = document.getElementById('side');
let httpReq = new XMLHttpRequest()
httpReq.open("GET" , "https://api.covid19api.com/countries" , true)
httpReq.onreadystatechange = function(){
    if(httpReq.readyState==4 && httpReq.status==200){
        let raw = JSON.parse(httpReq.response)
        resp=raw.sort((a,b)=> a.Country>b.Country?1:-1)
        resp.forEach(e => {
            let d =document.createElement("div")
            d.innerHTML= e.Country
            d.style.marginTop = "0.10cm";
            d.style.height = "27px";
            d.style.fontSize="20px";
            d.style.padding = "3px";
            d.setAttribute('id' , e.ISO2)
            d.setAttribute('class', "pays")
            d.addEventListener("click",clicked)
            d.style.textAlign = "center"
            list.appendChild(d)
        });
    }
}
httpReq.send()