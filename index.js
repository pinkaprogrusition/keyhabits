///Создаем новый компонент "Highchart" - график.
const Highchart = Vue.component('Highchart', {
    props:['data'],
    data: function (){
        return {
            chart: undefined
        }
    },
    methods:{
        //Функцмя перерисовки графика
        redraw(){
            var highchartsOptions = {
                credits: {
                    enabled: false
                },
                exporting: {
                    enabled: false
                },
                chart: {
                type: 'area',
                renderTo: 'container'
                },
                title: {
                text: 'Урожайность семян на Луне'
                },
                subtitle: {
                text: 'По мотивам книги "Незнайка на Луне"'
                },
                xAxis: {
                categories: ['2025', '2026', '2027', '2028'],
                tickmarkPlacement: 'on',
                title: {
                    text: 'годы'
                }
                },
                yAxis: {
                title: {
                    text: 'шт./м2'
                },
                labels: {
                    formatter: function () {
                    return this.value / 1000;
                    }
                }
                },
                tooltip: {
                split: true,
                valueSuffix: ' шт./м2'
                },
                plotOptions: {
                area: {
                    stacking: 'normal',
                    lineColor: '#666666',
                    lineWidth: 1,
                    marker: {
                    lineWidth: 1,
                    lineColor: '#666666'
                    }
                }
                },
                series: this.data
            }
			this.chart = new Highcharts.chart(highchartsOptions)
      }
    },
    watch:{
        //При изменении данных перерисовываем график
        data(){
            this.redraw()
        }
    },
    template: '<div><div id="container"></div></div>',
    mounted() {
		this.redraw()
	}
});

//Основной компонент Vue.
new Vue({
    el: '#app',
    data: {
        //Базовый набор данных для построения графика
        data: [{
            name: 'Пшеница',
            data: [5020, 6350, 8090, 9470]
          }, {
            name: 'Гречиха',
            data: [1630, 2030, 2760, 4080]
          }, {
            name: 'Ячмень',
            data: [1860, 1070, 1110, 1330]
          }],
          //Данные полей ввода для нового типа семян
          newItemData:{
              name: 'Item4',
              value2025: 1111,
              value2026: 5555,
              value2027: 4444,
              value2028: 3333
          },
          createNewName: false
    },
    methods:{
        //Функция добавления нового типа семян
        addItem(){
            if(this.newItemData.name != "" && 
            this.isValid(this.newItemData.value2025) >= 0 &&
            this.isValid(this.newItemData.value2026) >= 0 &&
            this.isValid(this.newItemData.value2027) >= 0 &&
            this.isValid(this.newItemData.value2028) >= 0 ){
                
                let flag = true;
                for(let item of this.data){
                    if(item.name == this.newItemData.name){
                        flag = false;
                        this.createNewName = true;
                        break;
                    }
                }

                if(flag){
                    this.data.push({
                        name: this.newItemData.name,
                        data: [
                            this.newItemData.value2025, 
                            this.newItemData.value2026, 
                            this.newItemData.value2027, 
                            this.newItemData.value2028
                        ]
                    })
                    this.createNewName = false;
                    this.newItemData.name = ''; 
                    this.newItemData.value2025 = 0; 
                    this.newItemData.value2026 = 0;
                    this.newItemData.value2027 = 0;
                    this.newItemData.value2028 = 0;
                }
            }
        },
        //Добавление случайного типа семян
        addRandomItem(){
            this.data.push({
                name: `Item${this.data.length+1}`,
                data: [
                    this.randInt(1000,6000),
                    this.randInt(1000,6000),
                    this.randInt(1000,6000),
                    this.randInt(1000,6000)
                ]
            })
        },
        //Функция для генерации случайного числа
        randInt(min,max){
            return Math.floor(Math.random()*(max-min)+min);
        },
        //Функция проверки на корректность числовых данных
        isValid(data){
            return !isNaN(data) && (data >= 0); 
        }
    },
    computed:{
        returnData(){
            return this.data;
        }
    },
    components: { Highchart }
});