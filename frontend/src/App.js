import './App.css';

import {
  Chart as ChartJS,
  Filler,
  Legend,
  LineElement,
  PointElement,
  RadialLinearScale,
  Tooltip,
} from 'chart.js';

import PatientCard from './components/PatientCard';
import { Radar } from 'react-chartjs-2';
import React from 'react';
import { io } from "https://cdn.socket.io/4.4.1/socket.io.esm.min.js";
import swal from 'sweetalert';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

var socket = io('http://localhost:3001');
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      patients: [],
    }
  }


  async componentDidMount() {
    let self = this;

    let alarm = new Audio('/alarm.mp3');

    setInterval(() => {
      if(this.state.patients.some(patient=>patient.state>70)){
        alarm.play();
        this.state.patients.filter(patient=>patient.state > 70).map(patient=>swal("Warning!", `${patient.name} has exceeded the risk threshold. Please investigate.`))

      }
    }, 2000);


    //this.interval = setInterval(() => this.getPatients(), 300);
    await this.getPatients();
    let patients = this.state.patients;
    patients.forEach(patient=>setInterval(()=>this.generateData(patient), 20000 - (Math.random() * 15000)))
  }
  componentWillUnmount(){
    // clearInterval(this.interval)
  }
  generateData(patient) {
    let patients = this.state.patients;

    this.setState({
       patients: patients.map(_patient=>{
          if(_patient.name !== patient.name || patient.name === "Colton") return _patient;
          _patient.state = Math.random() * 70.5
          return _patient
        })
    })
  }
  async getPatients() {
    await fetch("http://localhost:3000/patients")
      .then(data => data.json())
      .then(json => {
        this.setState({
          patients: json
        })
      })

      socket.on("connection", ()=>{
        socket.emit("monitoring_device")

        socket.on("monitoring", score=>{
          let patients = this.state.patients;

          this.setState({
            patients: patients.map(_patient=>{
               if(_patient.name !== "Colton") return _patient;
               _patient.state = score
               return _patient
             })
         })
        })
      })

  }

  render() {
    return (
      <div className='grid grid-cols-2 p-4'>
        <div className='flex flex-col justify-center p-40'>
          <Radar
              data={{
                label: "",
                suggestedMax: 100,
                labels: this.state.patients.map(patient=>patient.name),
                datasets: [{
                  order: 2,
                  backgroundColor: 'rgb(255, 99, 132)',
                  borderColor: 'rgb(255, 99, 132)',
                  label: "Risk score",
                  data: this.state.patients.map(patient=>patient.state)
                  ,
                }]
              }
            }
          />
        </div>
      <div className='m-20'>
        <div className='grid grid-cols-3'>
          <p className='p-1'>Name</p>
          <p className='p-1'>Age</p>
          <p className='p-1'>Risk Score (%)</p>
        </div>
        <div className='grid h-screen grid-cols-1 overflow-y-scroll'>
          {this.state.patients.sort((a,b) => b.state - a.state).map(patient => {
            return <PatientCard
              key={patient.id}
              name={patient.name}
              age={patient.age}
              state={patient.state}
            />
          })}
        </div>
      </div>
      </div>
    );
  }
}
export default App;