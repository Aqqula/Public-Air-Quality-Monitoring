<template>
  <div>
      <header>  <!--HEDER-->
        <div class="container-fluid">
            <div class="row no-gutters">
                <div class="col-9 justify-content-end">
                   <img src="../assets/img/Logo.png" alt="Logo" width="280" height="39">
                </div>
            </div>
        </div>
    </header>

    <main> <!--MAIN-->
        <div class="HederImg"> <!-- HEDERIMG -->
            <img src="../assets/img/HI.png" alt="img/hederImg.png">
        </div>
        <div class="container-fluid">
            <div class="row InfoBox mx-auto"> <!-- InfoBoxs -->
                <div class="col-md-12 col-lg-2 BOX ">
                    <h3>0000</h3>
                    <p>Значення AQI</p>
                </div>
                <div class="col-md-6 col-lg-2 BOX ">
                    <h3>{{avgPM | roundNum}} мкг/м³</h3>
                    <p>Значення PM10</p>
                </div>
                <div class="col-md-6 col-lg-2 BOX ">
                    <h3>0000</h3>
                    <p>Значення PM2.5(мкг/м³)</p>
                </div>
                <div class="col-md-6 col-lg-2 BOX ">
                    <h3>0000</h3>
                    <p>Температура повітря(°C)</p>
                </div>
                <div class="col-md-6 col-lg-2 BOX ">
                    <h3>0000</h3>
                    <p>Вологість повітря(%)</p>
                </div>
            </div>
            <br>
            <div class="container-fluid graff">
                <span>Графік</span>
            </div>
            <br>
            <!-- <div class="row adding no-gutters">
                <div class="col-6">
                    <button type="button" class="btn btn-outline-success">Виберіть файл</button>  
                    <span>Для роботи завантажте файли!</span> 
                </div>
                <div class="col-6 d-flex justify-content-around">
                    <span>Дата -> </span>
                    <select name="Data" id="Data"><option value="data">Data1EcoBot</option><option value="data">data2</option></select>
                    <span>Час -> </span>
                    <select name="Data" id="Data"><option value="data">Chas1EcoBot</option><option value="data">Chas2</option></select>
                </div>
            </div> -->
        </div>
        <br>
        <div class="FuterImg"> <!-- HEDERIMG -->
            <img src="../assets/img/FuterImg.png" alt="img/FuterImg.png">
        </div>
    </main>

    <footer> <!--FOOTER-->

    </footer>
  </div>
</template>

<script>
import Vue from 'vue'
import AQI from '../assets/data/data.json'


export default {
    data() {
        return {
            arrayOfAqi : [],
            arrayOfPMTen : [],
            arrayOfPMTwo : [],
            arrayOfTemperature : [],
            arrayOfHumidity : [],
            avgPM: 0,
            DataOfAqi: 0,

        }
    },
    mounted() {
        this.arrayOfAqi = AQI;
        console.log(this.arrayOfAqi);

        // PM10
        this.arrayOfPMTen = this.arrayOfAqi.filter((el) => {
            return el.name == "PM10"
        });
          // PM2.5
        this.arrayOfPMTwo = this.arrayOfAqi.filter((el) => {
            return el.name == "PM2.5"
        });
        // Temperature
        this.arrayOfTemperature = this.arrayOfAqi.filter((el) => {
            return el.name == "Temperature"
        });
        // Humidity
        this.arrayOfHumidity = this.arrayOfAqi.filter((el) => {
            return el.name == "Humidity"
        });


        var result = this.arrayOfPMTwo.reduce(function(h, obj) {
        h[obj.date.slice(0, 7)] = (h[obj.date.slice(0, 7)] || []).concat(obj);
        return h; 
        }, {});
        result = Object.keys(result).map(key => {
        return {
            date: key, 
            PMTwoAvg : result[key].reduce((a, b) => a + (parseInt(b.data) || 0), 0)/result[key].length,
           }
        });
        console.log(result);

        //Good (0.0-12.0): Clow=0, Chight=12.0, Ilow=0, Ihight=50; - 
        //Moderate (12.1-35.4): Clow=12.1, Chight=35.4, Ilow=51, Ihight=100; + 
        //Unhealthy for Sensitive group (35.5-55.4): Clow=35.5, Chight=55.4, Ilow=101, Ihight=150; +
        //Unhealthy (55.5-150.4): Clow=55.5, Chight=150.4, Ilow=151, Ihight=200; +
        //Very Unhealthy (150.5-250.4): Clow=150.5, Chight=250.4, Ilow=201, Ihight=300; +
        //Hazardous (250.5-350.4): Clow=250.5, Chight=350.4, Ilow=301, Ihight=400; +
        //Very Hazardous (350.5-500.4): Clow=350.5, Chight=500.4, Ilow=401, Ihight=500;

        result.forEach((el) => {
            if ((el.PMTwoAvg > 0) && (el.PMTwoAvg < 12.0))
                el.DataOfAqi = (el.PMTwoAvg-0)/(12.0-0)*(50-0)+0;

            else if ((el.PMTwoAvg > 12.1) && (el.PMTwoAvg < 35.4))
                el.DataOfAqi = (el.PMTwoAvg-12.1)/(35.4-12.1)*(100-51)+51;

            else if ((el.PMTwoAvg > 35.5) && (el.PMTwoAvg < 55.4))
                el.DataOfAqi = (el.PMTwoAvg-35.5)/(55.4-35.5)*(150-101)+101;
            
            else if ((el.PMTwoAvg > 55.5) && (el.PMTwoAvg < 150.4))
                el.DataOfAqi = (el.PMTwoAvg-55.5)/(150.4-55.5)*(200-151)+151;

            else if ((el.PMTwoAvg > 150.5) && (el.PMTwoAvg < 250.4))
                el.DataOfAqi = (el.PMTwoAvg-150.5)/(250.4-150.5)*(300-201)+201;

            else if ((el.PMTwoAvg > 250.5) && (el.PMTwoAvg < 350.4))
                el.DataOfAqi = (el.PMTwoAvg-250.5)/(350.4-250.5)*(400-301)+301;

            else if ((el.PMTwoAvg > 350.5) && (el.PMTwoAvg < 500.4))
                el.DataOfAqi = (el.PMTwoAvg-350.5)/(500.4-350.5)*(500-401)+401;       
        });
        this.arrayOfAqi = result;
 


        // const sum = this.arrayOfPMTen.reduce( ( acc, x ) => acc + parseInt(x.data), 0)
        // const avg = sum / this.arrayOfPMTen.length;
        // console.log(`The sum is: ${sum}. The average is: ${avg}.`);
        // this.avgPM = avg;
    },
    filters: { 
        roundNum:  function(value) { 
                return Math.round(value * 100) / 100 
        }
    },

}
</script>

<style>
@font-face {
	font-family: 'Century Gothic Regular';
	src: url('../assets/fonts/CenturyGothic.ttf') format('truetype');
}
.graff span{
	font-family: 'Century Gothic Regular';
	font-size: 5.4vh;
	color: #008d46;
}
header{
	/*border: 1px solid;*/
	display: flex;
	flex-direction: row;
	padding: 0.9vh;
	background: linear-gradient(160deg,#98d633,#0d7c3a);
	opacity: 0.80;
}
.HederImg img{
	/*border: 1px solid;*/
	width: 100vw;
	height: auto;
	display: flex;
	justify-content: center;
	align-items: center;
}
.FuterImg img{
	width: 100vw;
	height: auto;
	display: flex;
	justify-content: center;
	align-items: center;
}
.InfoBox{
	/*border: 1px solid;*/
	padding: 0.5vh;
	display: flex;
	justify-content: space-between;
}
.InfoBox h3{
	color: #006400;
}
.row.InfoBox p{
	font-family:'Century Gothic Regular';
	font-size: 2vh;
}
.BOX{
	display: flex;
	flex-direction: column;
	align-items: center;
	padding-top: 1vh;
	border: 10px solid transparent;
	border-radius: 40px 10px;
	border-image: linear-gradient(to left, transparent 0%, #228B22 120%);
	border-image-slice: 0.9;
}
.graff{
    min-height: 40vh;
	display: flex;
    align-items: center;
    justify-content: center;
	border-left: 2px ridge #228B22;
	border-bottom: 2px ridge #228B22;
	border-right: 2px ridge #228B22;
}
.adding{
	display: flex;
	align-items: center;
	
}
.adding span{
	font-family:'Century Gothic Regular';
	font-size: 2.5vh;
}
select{
	color: #228B22;
	border-color: #228B22;
}
</style>