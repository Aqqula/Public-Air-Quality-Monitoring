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
                <div class="col-2 BOX ">
                    <h3>0000</h3>
                    <p>Значення AQI</p>
                </div>
                <div class="col-2 BOX ">
                    <h3>0000</h3>
                    <p>Значення PM10(мкг/м³)</p>
                </div>
                <div class="col-2 BOX ">
                    <h3>0000</h3>
                    <p>Значення PM2.5(мкг/м³)</p>
                </div>
                <div class="col-2 BOX ">
                    <h3>0000</h3>
                    <p>Температура повітря(°C)</p>
                </div>
                <div class="col-2 BOX ">
                    <h3>0000</h3>
                    <p>Вологість повітря(%)</p>
                </div>
            </div>
            <br>
            <div class="graff">
                <h1>Графік</h1>
            </div>
            <br>
            <div class="row adding no-gutters">
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
            </div>
        </div>
        <br>
        <div class="FuterImg"> <!-- HEDERIMG -->
            <img src="img/FuterImg.png" alt="img/FuterImg.png">
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
            arrayOfPM : [],
        }
    },
    mounted() {
        this.arrayOfAqi = AQI;
        console.log(this.arrayOfAqi);
       this.arrayOfPM = this.arrayOfAqi.filter((el) => {
            return el.name == "PM10"
        });
        const sum = this.arrayOfPM.reduce( ( acc, x ) => acc + parseInt(x.data), 0)

        // var sum = 0;
        // for( var i = 0; i < this.arrayOfPM.length; i++ ){
        //     sum += parseInt( this.arrayOfPM[i].data, 10 ); //don't forget to add the base
        // }

        const avg = sum / this.arrayOfPM.length;
        console.log(`The sum is: ${sum}. The average is: ${avg}.`);
    },
    methods:{

    },
    

}
</script>

<style>
/* @font-face {
	font-family: 'Century Gothic Regular';
	src: url('../fonts/CenturyGothic.ttf') format('truetype');
} */
h1{
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
	width: 206vh;
	height: 16vh;
	display: flex;
	justify-content: center;
	align-items: center;
}
.FuterImg img{
	width: 206vh;
	height: 30vh;
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
	display: flex;
	align-items: center;
	border-left: 2px ridge #228B22;
	border-bottom: 2px ridge #228B22;
	border-right: 2px ridge #228B22;
	padding: 20vh;
	padding-left: 90vh;
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