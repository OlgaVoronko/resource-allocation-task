import React, { Component } from 'react';
import {partedResources} from './NewTaskTable';
import TableDrawing from './TableDrawing';
import {info} from './EditTaskTable'

let countStep = 1; // для экспорта
let lastTableArray = []; // для последней таблицы


function NextStep(props) {
  if (!props.next) {
    return null;
  }
  return <TableDrawing />
}

  export default class GetInfoTeach extends Component {
    constructor() {
      super();
      this.state = {
        rows : document.getElementById('rows').value,
        columns : document.getElementById('columns').value,
        resources : document.getElementById('resources').value,
        showStep: false
      }
        this.handleToggleClick = this.handleToggleClick.bind(this);
    }
    handleToggleClick() {
      document.getElementById('goToNextStep').classList.add('hidden');
      this.setState(prevState => ({
        showStep: !prevState.showStep
      }));
    }
    buildFirstStep() {
      lastTableArray[0] = [];
      let tempArray = [];
      let n = 0;
      for (let i = 0; i < partedResources.length; i++) {
        tempArray.push('B' + (i+1) + ' (' + partedResources[i] + ') = ' + info[n]);
        lastTableArray[0].push(info[n]);
        n += partedResources.length-1;
      }
      return tempArray.map(item => <p>{item}</p>);
    }
    render() {
    return (
      <div className='block'>
      <div className='teachingBlock'>
          <p className='teaching'>
            Объединение, в состав которого входят n предприятий, обладает ресурсами объемом b единиц. Эти ресурсы распределяются
            между подчиненными предприятиями. Известно, что прибыль от x<sub>i</sub> единиц ресурсов, которые выделяются i-му предприятию,
            составляет  Z<sub>i</sub>(<sub>i</sub>)  единиц, где  Z<sub>i</sub>(x)- известная функциональная зависимость.<br/>
          </p>
          <p className='teaching'>
            Необходимо распределить ресурсы между предприятиями таким образом, чтобы суммарная прибыль по всему объединению была
            максимальной.
          </p>
          <p className='teaching'>
            Рассмотрим задачу о распределении ресурсов в объеме b={this.state.resources}  единиц между {this.state.columns}-ю предприятиями. Для упрощения предположим,
            что эти ресурсы выдаются предприятиям не произвольными объемами, а порциями.
          </p>
          <p className='teaching'>
          Будем интерпретировать нашу задачу как многошаговую задачу, т.е. задачу, в которой на первом шаге в распределении ресурсов
          участвует одно предприятие, на 2-ом — 2, ..., на n-ом — n. Воспользуемся принципами динамического программирования.
          <ol>
            <li><b>принцип инвариантного погружения.</b> «Погрузим» нашу задачу в семейство аналогичных задач, в которых</li>
                а) 	количество предприятий в составе объединения является произвольным и составляет  k, 1≤k≤n.<br />
                б) 	объем распределяемых ресурсов также является произвольной величиной y, 0≤y≤b.<br/>
            <li><b>принцип оптимальности.</b> Введем в рассмотрение <b>функцию Беллмана</b>:   — максимальная прибыль от распределения
             <b>y</b> единиц ресурсов между <b>k</b> предприятиями. Она пока неизвестна. Наша задача – найти ее.</li>
          </ol>
          </p>
          <p className='teaching'>
            Предположим сначала, что k=1, т.е. объединение состоит всего лишь из одного предприятия. В этом случае все очень просто:
            распределения ресурсов не требуется. Все ресурсы, которые имеются у объединения просто выделяются одному-единственному
            подчиненному предприятию и <img src="./func1.PNG" title="Функция Беллмана для к=1" alt="" />
          </p>
          <p className='teaching'>
            В силу этого <b>B1(y)=z1(y)</b>, т.е. <b>B1({partedResources[0]})={info[0]}</b>, <b>B1({partedResources[1]})={info[1]}</b> и т.д.
          </p>
        </div>
        <div>
          {this.buildFirstStep()}
        </div>
        <div className='teachingBlock'>
          <p className='teaching'>
            Теперь нам известна функция  , где <b>у</b> – произвольное количество ресурсов. Следовательно, с ее помощью можно узнать
            максимальную прибыль от распределения <b>y - x<sub>k+1</sub></b> между <b>k</b> предприятиями. Она  составит
            <b>B<sub>k</sub>(y - x<sub>k+1</sub>)</b>  единиц. Теперь можно подсчитать общую прибыль, которую получат <b>(k+1)</b> предприятий:
          </p>
          <img className='formula' src="./func2.PNG" title="Функция Беллмана для к предприятий" alt="" />
          <p>
            Проведем анализ полученного выражения. При фиксированном количестве ресурсов <b>y</b> оно является функцией одной
            переменной <b>x<sub>k+1</sub></b>, т.е. общая прибыль <b>(k+1)</b> предприятий зависит от того, сколько ресурсов
            будет выделено <b>(k+1)</b>-ому предприятию. В соответствии с целью объединения необходимо найти максимум:
          </p>
          <img className='formula' src="./func2.PNG" title="Функция Беллмана для к предприятий" alt="" />
          <p className='teaching'>
            Данное выражение представляет собой максимальную прибыль объединения от распределения <b>y</b> единиц ресурсов между
            <b>k+1</b> предприятиями. Но эту же величину выражает и функция <b>B<sub>k+1</sub>(y)</b>. Следовательно
          </p>
          <img className='formula' src="./bellman.PNG" title="Функция Беллмана для к предприятий" alt="" />
          <p className='teaching'>
            Последнее соотношение называют рекуррентным соотношением Беллмана. С его помощью можно последовательно найти функции
            <b>B<sub>2</sub></b>, <b>B<sub>3</sub></b>, ….
          </p>
          <p className='teaching'>
            Зачем это нужно? Во-первых,  информация о функции  позволяет найти <b>B<sub>n</sub>(y)</b> - максимальную прибыль <b>n</b>
            предприятий от распределения <b>b</b> единиц ресурсов. Во-вторых, зная  <b>B<sub>n</sub>(y)</b>,  <b>B<sub>n-1</sub>(y)</b>,
            …, <b>B<sub>1</sub>(y)</b>, можно последовательно найти оптимальное распределение ресурсов  <b>x<sub>n</sub>(y)</b>,
            <b>x<sub>n-1</sub>(y)</b>, ..., <b>x<sub>1</sub>(y)</b>.
          </p>
        </div>
        <button
          className='nextButton activeButton'
          id="goToNextStep"
          onClick={this.handleToggleClick}>
            Следующий шаг
        </button>
        <NextStep next={this.state.showStep} />
      </div>
    );
    }
  };

  export {countStep, lastTableArray}
