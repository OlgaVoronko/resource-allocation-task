import React, { Component } from 'react';
import {partedResources} from './NewTaskTable';
import Step2Teach from './Step2Teach';
import {info} from './EditTaskTable'

let countStep = 1; // для экспорта
let lastTableArray = []; // для последней таблицы
let tableBody = [];



function NextStep(props) {
  if (!props.next) {
    return null;
  }
  return <Step2Teach />
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
    drawHeader() {
      let headerArray = partedResources.slice();
      return headerArray.map(item => <td>{item}</td>);
    }
    getNextColumn() {
      let nextColumnArray = [];
      for (let i = 0; i < this.state.rows; i++) {
        nextColumnArray.push(document.getElementById('input' + (i+1) + 2).value)
      }
      return nextColumnArray.map((item, index) => <td id={'header' + (+index + 1)}>{item}</td>);
    }
    formTableBody() {
        for (let i = 0; i < 3; i++) {
          tableBody[i] = [];
        for (let j = 0; j < +this.state.rows + 1; j++) {
          tableBody[i].push('');
        }
      }
      return tableBody.map((item, index) => <tr><td id={'firstCol' + (+index + 1)}></td>{item.map((it, ind) => <td><p
        className='line1' id={'teach1-' + (+index + 1) + (+ind)}>{it}</p><p className='line2' id={'teach2-' + (+index + 1) +
        (+ind)}></p></td>)}<td id={'maxValue' + (+index + 1)}></td></tr>);
    }
    formTableBody2() {
        for (let i = 0; i < 4; i++) {
          tableBody[i] = [];
        for (let j = 0; j < +this.state.rows + 1; j++) {
          tableBody[i].push('');
        }
      }
      return tableBody.map((item, index) => <tr><td id={'firstCol2' + (+index + 1)}></td>{item.map((it, ind) => <td><p
        className='line1' id={'teach12-' + (+index + 1) + (+ind)}>{it}</p><p className='line2' id={'teach22-' + (+index + 1) +
        (+ind)}></p></td>)}<td id={'maxValue2' + (+index + 1)}></td></tr>);
    }
    handleToggleClick() {
      document.getElementById('goToNextStep').classList.add('hidden');
      this.setState(prevState => ({
        showStep: !prevState.showStep
      }));
    }
    componentDidMount() {
      document.getElementById('firstCol1').innerHTML = partedResources[0];
      document.getElementById('firstCol2'). innerHTML = '...';
      document.getElementById('firstCol3').innerHTML = partedResources[partedResources.length - 1];
      document.getElementById('teach1-10').innerHTML = info[0];
      document.getElementById('teach1-11').innerHTML = 0;
      document.getElementById('teach2-10').innerHTML = 0 + +info[0];
      document.getElementById('teach2-11').innerHTML = +document.getElementById('input12').value  + 0;

      document.getElementById('firstCol21').innerHTML = partedResources[0];
      document.getElementById('firstCol22').innerHTML = partedResources[1];
      document.getElementById('firstCol23').innerHTML = '...';
      document.getElementById('firstCol24').innerHTML = partedResources[2];
      document.getElementById('teach12-10').innerHTML = info[0];
      document.getElementById('teach12-11').innerHTML = 0;
      document.getElementById('teach22-10').innerHTML = 0 + +info[0];
      document.getElementById('teach22-11').innerHTML = +document.getElementById('input12').value  + 0;
      document.getElementById('teach12-20').innerHTML = +document.getElementById('input21').value  + 0;
      document.getElementById('teach12-21').innerHTML = +document.getElementById('input11').value;
      document.getElementById('teach12-22').innerHTML = 0;
      document.getElementById('teach22-20').innerHTML = +document.getElementById('input21').value  + 0;
      document.getElementById('teach22-21').innerHTML = +document.getElementById('input12').value  + +document.getElementById('input11').value;
      document.getElementById('teach22-22').innerHTML = +document.getElementById('input22').value  + 0;
    }
    render() {
    return (
      <div className='block'>
        <div className='teachingBlock'>
          <img className='formula' src="./b2.PNG" title="B2" alt="" />
          <p className='teaching'>Получим значение <b>B2 для y={partedResources[0]}</b>:</p>
          <p className='teaching'>
            <b>B<sub>2</sub>({partedResources[0]}) = max (z<sub>2</sub>(x<sub>2</sub>) + B<sub>1</sub>({partedResources[0]} -
              x<sub>2</sub>) ) = max (z<sub>2</sub>(0) + B<sub>1</sub>({partedResources[0]}), z<sub>2</sub>({partedResources[0]})
              + B<sub>1</sub>(0)) = max(0 + {partedResources[1]}, {partedResources[0]}) = {partedResources[1]}</b>
          </p>
          <p className='teaching'>Для <b>y={partedResources[1]}</b> будем иметь:</p>
          <p>
            <b>B<sub>2</sub> ({partedResources[1]} = max (z<sub>2</sub>(x<sub>2</sub> + B<sub>1</sub>({partedResources[1]} - x<sub>2</sub>))) =
            max [z<sub>2</sub>(0) + B<sub>1</sub>({partedResources[1]}), z<sub>2</sub>({partedResources[0]}) + B<sub>1</sub>({partedResources[0]}),
            z<sub>2</sub>({partedResources[1]}) + B<sub>1</sub>(0)] = max [0 + {info[5]}, {info[1]} + {info[0]},
            {info[6]} + 0] = {info[5]}.</b>
          </p>
          <p className='teaching'>Аналогично для <b>y=30</b>:</p>
          <p className='teaching'>
            <b>B<sub>2</sub> ({partedResources[2]}) = max [z<sub>2</sub>](x<sub>2</sub>) + B<sub>1</sub>({partedResources[2]} - x<sub>2</sub>)]</b>
          </p>
          <p className='teaching'>
            Как видим, работа несложная, однако требует внимания и времени. Попробуем её упростить.
            Для этого введем в рассмотрение таблицу  следующей структуры:
          </p>
        </div>
          <table className='stepTable' id='stepTable'>
            <thead>
              <tr>
                <td rowspan='2'>Z2</td>
                <td>0</td>
                {this.drawHeader()}
                <td rowspan='2'>B2(y)</td>
              </tr>
              <tr>
                <td id="header0">0</td>
                {this.getNextColumn()}
              </tr>
            </thead>
            <tbody>
              {this.formTableBody()}
            </tbody>
          </table>
        <div className='teachingBlock'>
          <p className='teaching'>
            В верхнюю часть клеток строки со значением <b>y={partedResources[0]}</b> мы занесли <b>B1({partedResources[0]})</b> и <b>B1(0)</b>.
            Цифры в нижней части этих клеток получились путем суммирования значений в верхней части этих клеток и соответствующих
            значений в строке <b>z2</b>. – обратите внимание: как раз эти суммы находятся под знаком max в формулах выше. Осталось выбрать
            максимальное из чисел в нижней части заполненных клеток и занести его в клетку, соответствующую <b>B2({partedResources[0]})</b>.
          </p>
          <p className='teaching'>
            Перенесем в таблицу результаты вычисления  B2({partedResources[1]}):
          </p>
        </div>
        <table className='stepTable' id='stepTable'>
          <thead>
            <tr>
              <td rowspan='2'>Z2</td>
              <td>0</td>
              {this.drawHeader()}
              <td rowspan='2'>B2(y)</td>
            </tr>
            <tr>
              <td id="header0">0</td>
              {this.getNextColumn()}
            </tr>
          </thead>
          <tbody>
            {this.formTableBody2()}
          </tbody>
        </table>
        <div className='teachingBlock'>
          <p className='teaching'>
            Снова в верхнюю часть клеток строки со значением <b>y={info[0]}</b> мы занесли <b>B1({partedResources[1]}), B1(partedResources[0])</b>
            и B1(0). Цифры в нижней части этих клеток получились путем суммирования значений в верхней части этих клеток и соответствующих
            значений в строке z2. Максимальное из чисел в нижней части заполненных клеток занесено в клетку, соответствующую B2({partedResources[0]}).
          </p>
          <p className='teaching'>
            Обобщая дважды проделанную работу, можно сделать вывод, что для вычисления <b>B2({partedResources[2]})</b> нужно в верхнюю часть
            соответствующих клеток занести значения <b>B1{partedResources[2]}), B1({partedResources[1]}), B1({partedResources[0]})</b> и
            <b>B1(0)</b>, для вычисления <b>B2(40)</b> - значения <b>B1({partedResources[3]}), B1({partedResources[2]}),
            B1({partedResources[1]}), B1(partedResources[0]), B1(0)</b> И так далее.
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
