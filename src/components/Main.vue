<template>
  <div>
      <header>  <!--HEDER-->
        <div class="container-fluid">
            <div class="row no-gutters">
                <div class="col-9 col-sm-6 col-lg-8">
                   <img src="../assets/img/Logo.png" alt="Logo" width="280" height="39">
                </div>          
                <div class="col-3 col-sm-6 col-lg-4">
                    <button type="button" class="btn btn-success"><router-link to="/saveecobot-info">Продивитися додаткову інформацію</router-link></button>
                </div>
            </div>
        </div>
    </header>

    <main> <!--MAIN-->
        <div class="HederImg"> <!-- HEDERIMG -->
            <img src="../assets/img/HI.png" alt="img/hederImg.png">
        </div>
        <div class="container-fluid ">
            <h1 class="centre">Актуальні дані на сьогоднішній день</h1>
            <br>
            <div class="row InfoBox mx-auto"> <!-- InfoBoxs -->
                <div class="col-md-12 col-lg-2 BOX ">
                    <h3>{{boxAQI | roundNum}}</h3>
                    <p>Значення AQI</p>
                </div>
                <div class="col-md-6 col-lg-2 BOX ">
                    <h3>{{boxPM25 | roundNum}} мкг/м³</h3>
                    <p>Значення PM10</p>
                </div>
                <div class="col-md-6 col-lg-2 BOX ">
                    <h3>{{boxPM10 | roundNum}} мкг/м³</h3>
                    <p>Значення PM2.5</p>
                </div>
                <div class="col-md-6 col-lg-2 BOX ">
                    <h3>27°C</h3>
                    <p>Температура повітря</p>
                </div>
                <div class="col-md-6 col-lg-2 BOX ">
                    <h3>65 %</h3>
                    <p>Вологість повітря</p>
                </div>
            </div>
            <br>
            <div class="container-fluid graff">
                <h1>Графік аналізу даних AQI</h1>
                <br>
                <vue-chart type="horizontalBar" :data="chartData"></vue-chart>
            </div>
            <br>
            <br>
                <h1 class="centre">Про вимірювання якості повітря та забруднення:</h1>
                <table class="table table-sm">
                    <thead>
                        <tr class="table-light">
                            <th scope="col">AQI</th>
                            <th scope="col">Рівень забруднення повітря</th>
                            <th scope="col">Наслідки для здоров’я</th>
                            <th scope="col">Застереження (для PM2,5)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="green">
                            <th scope="row">0 - 50</th>
                            <td>Добрий</td>
                            <td>Якість повітря вважається задовільною, а забруднення повітря становить невеликий ризик або взагалі не становить його.</td>
                            <td>Жодного</td>
                        </tr>
                        <tr class="yellow"> 
                            <th scope="row">51 -100</th>
                            <td>Помірний</td>
                            <td>Якість повітря прийнятна; однак для деяких забруднювачів може існувати помірне занепокоєння щодо здоров'я дуже невеликої кількості людей, які є надзвичайно чутливими до забруднення повітря.</td>
                            <td>Активні діти та дорослі, а також люди з респіраторними захворюваннями, такими як астма, повинні обмежувати тривалі навантаження на вулиці.</td>
                        </tr>
                        <tr class="orange">
                            <th scope="row">101-150</th>
                            <td>Нездоровий для чутливих груп</td>
                            <td>Члени чутливих груп можуть відчувати наслідки для здоров'я. Населення, швидше за все, не постраждає.</td>
                            <td>Активні діти та дорослі, а також люди з респіраторними захворюваннями, такими як астма, повинні обмежувати тривалі навантаження на вулиці.</td>
                        </tr>
                        <tr class="red">
                            <th scope="row">151-200</th>
                            <td>Нездоровий</td>
                            <td>Кожен може почати відчувати наслідки для здоров’я; члени чутливих груп можуть відчувати більш серйозні наслідки для здоров'я.</td>
                            <td>Активним дітям і дорослим, а також людям із захворюваннями органів дихання, такими як астма, слід уникати тривалих навантажень на свіжому повітрі; всім іншим, особливо дітям, слід обмежити тривалі навантаження на вулиці.</td>
                        </tr>
                        <tr class="purple">
                            <th scope="row">201-300</th>
                            <td>Дуже нездоровий</td>
                            <td>Попередження про стан здоров’я в надзвичайних ситуаціях. Все населення, швидше за все, постраждає.</td>
                            <td>Активні діти та дорослі, а також люди з респіраторними захворюваннями, такими як астма, повинні уникати будь-яких навантажень на вулиці; всім іншим, особливо дітям, слід обмежувати навантаження на відкритому повітрі.</td>
                        </tr>
                        <tr class="maroon">
                            <th scope="row">300+</th>
                            <td>Небезпечний</td>
                            <td>Попередження про стан здоров’я: кожен може відчувати більш серйозні наслідки для здоров’я.</td>
                            <td>Кожен повинен уникати будь-яких навантажень на вулиці.</td>
                        </tr>
                    </tbody>
                </table>
            <br>
        </div>
        <br>
        <div class="FuterImg"> <!-- HEDERIMG -->
            <img src="../assets/img/FuterImg.png" alt="img/FuterImg.png">
        </div>
    </main>

    <footer><!--FOOTER--></footer>
  </div>
</template>

<script>
import Vue from 'vue'
import VueRouter from 'vue-router'
import AQI from '../assets/data/data.json'
import VueChart from 'vue-chart-js'


export default {
    data() {
        return {
            arrayOfAqi : [],
            arrayOfPMTen : [],
            arrayOfPMTwo : [],
            arrayOfTemperature : [],
            arrayOfHumidity : [],
            boxAQI: 0,
            boxPM25: 0,
            boxPM10: 0,
            boxTemp:0,
            boxHum: 0,
            DataOfAqi: 0,
            chartData: {
                labels: [],
                datasets: [
                    
                ]
            }
        }
    },
    components: {
        VueChart
    },
    mounted() {
        this.arrayOfAqi = AQI;
        //console.log(this.arrayOfAqi);

        // PM10
        this.arrayOfPMTen = this.arrayOfAqi.filter((el) => {
            return el.name == "PM10"
        });
          // PM2.5
        this.arrayOfPMTwo = this.arrayOfAqi.filter((el) => {
            return el.name == "PM2.5"
        });
        // Temperature
        this.arrayOfTemp = this.arrayOfAqi.filter((el) => {
            return el.name == "Temperature"
        });
        // Humidity
        this.arrayOfHum = this.arrayOfAqi.filter((el) => {
            return el.name == "Humidity"
        });

        //Перебыраємо масив з ПМ2.5 за датою
        var result = this.arrayOfPMTwo.reduce(function(h, obj) {
        h[obj.date.slice(0, 7)] = (h[obj.date.slice(0, 7)] || []).concat(obj);
        return h; 
        }, {});
        result = Object.keys(result).map(key => {
        return {
            date: key, 
            PMTwoAvg : result[key].reduce((a, b) => a + (parseInt(b.data) || 0), 0)/result[key].length,
            PMTwoMax : result[key].reduce((a, b) => (!a)? parseInt(b.data) : Math.max(a, parseInt(b.data))),
            PMTwoMin : result[key].reduce((a, b) => (!a)? parseInt(b.data) : Math.min(a, parseInt(b.data))),
           }
        });
        console.log(result);

        //Перебыраємо масив з ПМ10 за датою
        var resultOfPMTen = this.arrayOfPMTen.reduce(function(h, obj) {
        h[obj.date.slice(0, 7)] = (h[obj.date.slice(0, 7)] || []).concat(obj);
        return h; 
        }, {});
        resultOfPMTen = Object.keys(resultOfPMTen).map(key => {
        return {
            date: key, 
            PMTenAvg : resultOfPMTen[key].reduce((a, b) => a + (parseInt(b.data) || 0), 0)/resultOfPMTen[key].length,
           }
        });
        //console.log(resultOfPMTen);

        //Перебыраємо масив з Temperature за датою
        var resultOfTemp = this.arrayOfTemp.reduce(function(h, obj) {
        h[obj.date.slice(0, 7)] = (h[obj.date.slice(0, 7)] || []).concat(obj);
        return h; 
        }, {});
        resultOfTemp = Object.keys(resultOfTemp).map(key => {
        return {
            date: key, 
            TempAvg : resultOfTemp[key].reduce((a, b) => a + (parseInt(b.data) || 0), 0)/resultOfTemp[key].length,
           }
        });
        //console.log(resultOfTemp);

        //Перебыраємо масив з Humidity за датою
        var resultOfHum = this.arrayOfHum.reduce(function(h, obj) {
        h[obj.date.slice(0, 7)] = (h[obj.date.slice(0, 7)] || []).concat(obj);
        return h; 
        }, {});
        resultOfHum = Object.keys(resultOfHum).map(key => {
        return {
            date: key, 
            HumAvg : resultOfHum[key].reduce((a, b) => a + (parseInt(b.data) || 0), 0)/resultOfHum[key].length,
           }
        });
        //console.log(resultOfHum);

        result.forEach((el) => {
            el.DataOfAqiAvg = this.calculateAQI(el.PMTwoAvg);
            el.DataOfAqiMin = this.calculateAQI(el.PMTwoMin);
            el.DataOfAqiMax = this.calculateAQI(el.PMTwoMax);
        });

        // this.arrayOfAqi = result;


        let labelsOfChart = [];
        let color = '';
        //bar chart AQI(avg)
        let dataOfAqiAvg = [];
        let colorsOfAqiAvg = [];
        result.forEach(el => {
            dataOfAqiAvg.push(el.DataOfAqiAvg);
            if (el.DataOfAqiAvg < 50) {
                color = '#66aa00e0'; 
            } 
            else if (el.DataOfAqiAvg < 100) {
                color = 'rgba(255, 247, 0, 0.59)'; 
            }
            else if (el.DataOfAqiAvg < 150) {
                color = 'rgba(255, 166, 0, 0.611)'; 
            }
            else if (el.DataOfAqiAvg < 200) {
                color = '#ff00008e'; 
            }
            else if (el.DataOfAqiAvg < 300) {
                color = 'rgba(128, 0, 128, 0.761)'; 
            }
            else {
                color = 'green'; 
            }
            colorsOfAqiAvg.push(color)
            labelsOfChart.push(el.date);
        });
        this.chartData.labels = labelsOfChart;
        this.chartData.datasets.push({"label": "Середне значення AQI", "data": dataOfAqiAvg, "backgroundColor": colorsOfAqiAvg});

        //bar chart AQI(max)
        let dataOfAqiMax = [];
        let colorsOfAqiMax = [];
        result.forEach(el => {
            dataOfAqiMax.push(el.DataOfAqiMax);
            if (el.DataOfAqiMax < 50) {
                color = '#66aa00e0'; 
            } 
            else if (el.DataOfAqiMax < 100) {
                color = 'rgba(255, 247, 0, 0.59)'; 
            }
            else if (el.DataOfAqiMax < 150) {
                color = 'rgba(255, 166, 0, 0.611)'; 
            }
            else if (el.DataOfAqiMax < 200) {
                color = '#ff00008e'; 
            }
            else if (el.DataOfAqiMax < 500) {
                color = 'rgba(128, 0, 128, 0.761)'; 
            }
            else {
                color = 'green'; 
            }
            colorsOfAqiMax.push(color)
        });
        this.chartData.datasets.push({"label": "Максимальне значення AQI", "data": dataOfAqiMax, "backgroundColor": colorsOfAqiMax, hidden: true});

        //bar chart AQI(min)
        let dataOfAqiMin = [];
        let colorsOfAqiMin = [];
        result.forEach(el => {
            dataOfAqiMin.push(el.DataOfAqiMin);
            if (el.DataOfAqiMin < 50) {
                color = '#66aa00e0'; 
            } 
            else if (el.DataOfAqiMin < 100) {
                color = 'rgba(255, 247, 0, 0.59)'; 
            }
            else if (el.DataOfAqiMin < 150) {
                color = 'rgba(255, 166, 0, 0.611)'; 
            }
            else if (el.DataOfAqiMin < 200) {
                color = '#ff00008e'; 
            }
            else if (el.DataOfAqiMin < 300) {
                color = 'rgba(128, 0, 128, 0.761)'; 
            }
            else {
                color = 'green'; 
            }
            colorsOfAqiMin.push(color)
        });
        this.chartData.datasets.push({"label": "Мінімальне значення AQI", "data": dataOfAqiMin, "backgroundColor": colorsOfAqiMin, hidden: true});

        //Верхние боксы
        this.boxAQI = result[result.length - 1].DataOfAqiAvg;
        this.boxPM25 = result[result.length - 1].PMTwoAvg;
        this.boxPM10 = resultOfPMTen[resultOfPMTen.length - 1].PMTenAvg;
        this.boxTemp = resultOfTemp[resultOfTemp.length - 1].TempAvg;
        this.boxHum = resultOfHum[resultOfHum.length - 1].HumAvg;
        

    },
    methods: {
        //формула для АКЮ
        calculateAQI(data) {
            if ((data > 0) && (data < 12.0))
                return (data-0)/(12.0-0)*(50-0)+0;
            else if ((data > 12.1) && (data < 35.4))
                return (data-12.1)/(35.4-12.1)*(100-51)+51;
            else if ((data > 35.5) && (data < 55.4))
                return (data-35.5)/(55.4-35.5)*(150-101)+101;
            else if ((data > 55.5) && (data < 150.4))
                return (data-55.5)/(150.4-55.5)*(200-151)+151;
            else if ((data > 150.5) && (data < 250.4))
                return (data-150.5)/(250.4-150.5)*(300-201)+201;
            else if ((data > 250.5) && (data < 350.4))
                return (data-250.5)/(350.4-250.5)*(400-301)+301;
            else if ((data > 350.5) && (data < 500.4))
                return (data-350.5)/(500.4-350.5)*(500-401)+401;     
        }
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
h1{
    font-family: 'Century Gothic Regular';
	font-size: 5.4vh;
	color: #008d46;
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
.orange{
    background-color: rgba(255, 166, 0, 0.611);
}
.orange:hover{
    background-color: orange;
}
.green{
    background-color:#acff2fb1;
}
.green:hover{
    background-color: #66aa00e0;
}
.yellow{
    background-color:rgba(255, 247, 0, 0.59);
}
.yellow:hover{
    background-color: rgb(206, 206, 0);
}
.red{
    background-color: #ff00008e;
}
.red:hover{
    background-color: rgba(255, 0, 0, 0.789);
}
.purple{
    background-color: #80008090;
}
.purple:hover{
    background-color: rgba(128, 0, 128, 0.761);
}
.maroon{
    background-color: #ff000085;
}
.maroon:hover{
    background-color: rgba(139, 0, 0, 0.796);
}
table{
    border: 2px solid #228B22;
}
a{
    color: white;
}
a:hover{
    color:#006400;
}
.btn-success {
    width: 100%;
}
.centre{
    font-family: 'Century Gothic Regular';
	color: #008d46;
    display: flex;
    justify-content: center;
}
</style>