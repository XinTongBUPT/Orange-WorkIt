import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Timer from 'react-compound-timer';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';

import {
    AppBar
} from '../../components';
import './styles.css';

import {
    load_moves,
    load_routines, 
    increment_move_index
} from '../../reducers/reducer';

const styles = theme => ({
    card: {
      width: '100%',
      justify: "center",
      font: '100px',
    },
  });

//   function loopMoves(moves) {
//     const img_lst = [squats, plank, crunches];
//     return _.map(moves, (move, index) => {
//         return (
//           <ListItem button key={index}>
//               <Avatar src={img_lst[index]}>
//               </Avatar>
//               <ListItemText primary={move.name} secondary={"time: " + move.total_time + "sec"} />
//               <KeyboardArrowRight/>
//           </ListItem>
//             )
//     });
// }

// function loadNext(move_index) {
//     increment_move_index(move_index);
//
//
// };
//
// const MoveComponent = (props, { moves, move_index }) => {
//     console.log(props.location.state);
//     setTimeout(() => console.log(move_index), 5000);
//     return (
//         <div>
//             <AppBar />
//             <br />
//             <br />
//             <div class="page-content">
//             <div class="resp-container">
//             <iframe class="resp-iframe" width="560" height="315" src="https://www.youtube.com/embed/ynUw0YsrmSg?version=3&controls=0&start=54&end=83&autoplay=1"
//                 frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
//             </div>
//                 <br />
//                 <h2>{moves[move_index].name}</h2>
//                 <Card>
//                     <div class="timer">
//                     <Timer
//                             initialTime={1000} // hardcode. replace.
//                             direction="backward"
//                             checkpoints={[
//                                 {time: 0,
//                                 callback: () => loadNext(move_index) } // callback function for when timer reaches 0
//                             ]}
//                         >
//                             {( { pause, resume } ) => ( // the formatValue attribute formats the seconds such that the leading 0 is displayed on single digits
//                                 <React.Fragment>
//                                 <div>
//                                     <Timer.Minutes formatValue={(value) => `${(value < 10 ? `0${value}` : value)}:`}/>
//                                     <Timer.Seconds formatValue={(value) => `${(value < 10 ? `0${value}` : value)}`}/>
//                                 </div>
//                                 <div>
//                                     <Button variant="contained" color="primary" onClick={pause}>Pause</Button>  <Button variant="contained" color="primary" onClick={resume}>Resume</Button>
//                                 </div>
//                                 </React.Fragment>
//                             )}
//                         </Timer>
//                     </div>
//                 </Card>
//             </div>
//         </div>
//     )
// };
//
// export { MoveComponent };
//
// const mapStateToProps = (state, ownProps) => {
//     const { reducer } = state;
//     const { loading, moves, move_index } = reducer;
//     return {
//         ...ownProps,
//         loading,
//         moves,
//         move_index
//     };
// };
//
// export const Move = connect(mapStateToProps, {
//     load_moves,
//     increment_move_index
// })(MoveComponent);


//====================
// updating move_index using redux
//====================

class MoveComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            move_time: this.props.location.state.move_time,
            break_time: this.props.location.state.break_time,
            timerKey: 0,
            video_url: this.props.moves[0].video_url.replace("www.youtube.com/watch?v=", "www.youtube.com/embed/"),
            move_name: this.props.moves[0].name,
        };

    };

    // componentDidMount() {
    //     //console.log(this.props.location.state.move_time)
    //     this.state.index = 0;
    // }

    //https://www.youtube.com/embed/aCa8R9II8F0?version=3&controls=0&start=54&end=83&autoplay=1

    handleNext(move_index) {
        if (this.props.move_index >= this.props.moves.length - 1) {
            return;
        }
        this.props.increment_move_index(move_index);
        console.log(this.props.moves);
        //setTimeout(() => console.log(this.props.move_index), 2000);
        //console.log(this.state.move_time)
        this.setState((state) => {
            return {
                timerKey: Math.random(),
                move_time: this.props.location.state.move_time,
                break_time: this.props.location.state.break_time,
                video_url: this.props.moves[this.props.move_index].video_url.replace("www.youtube.com/watch?v=", "www.youtube.com/embed/"),
                move_name: this.props.moves[this.props.move_index].name,
            }
        })
        //console.log(this.state.move_time)

    }

    loadNext = (move_index) => {

    };

    render() {
        console.log(this.props.move_index)
        return ( // hardcode <h2>. replace.
        <div>
            <AppBar />
            <br />
            <br />
            <div class="page-content">
            <div class="resp-container">
            <iframe class="resp-iframe" width="560" height="315" src={this.state.video_url}
                frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
                <br />
                <h2>{this.state.move_name}</h2>
                <Card>
                    <div class="timer">
                    <Timer
                            key={this.state.timerKey}
                            initialTime={this.state.move_time} // hardcode. replace.
                            direction="backward"
                            onReset={() => {

                            }}
                            checkpoints={[
                                {time: 0,
                                callback: () => this.handleNext(this.props.move_index) } // callback function for when timer reaches 0
                            ]}
                        >
                            {( { pause, resume } ) => ( // the formatValue attribute formats the seconds such that the leading 0 is displayed on single digits
                                <React.Fragment>
                                <div>
                                    <Timer.Minutes formatValue={(value) => `${(value < 10 ? `0${value}` : value)}:`}/>
                                    <Timer.Seconds formatValue={(value) => `${(value < 10 ? `0${value}` : value)}`}/>
                                </div>
                                <div>
                                    <Button variant="contained" color="primary" onClick={pause}>Pause</Button>  <Button variant="contained" color="primary" onClick={resume}>Resume</Button>
                                </div>
                                </React.Fragment>
                            )}
                        </Timer>
                    </div>
                </Card>
            </div>
        </div>

        );
    }
}
export { MoveComponent };

const mapStateToProps = (state, ownProps) => {
    const { reducer } = state;
    const { loading, moves, move_index } = reducer;
    return {
        ...ownProps,
        loading,
        moves,
        move_index
    };
};

export const Move = connect(mapStateToProps, {
    load_moves,
    load_routines,
    increment_move_index
})(MoveComponent);

//====================
// updating move_index using component state
//====================
// class MoveComponent extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             index: 0
//         };

//     };

//     handleNext() {
//         console.log("made it to handle next!")
//         this.setState((state) => {
//             return {index: state.index + 1}
//         })
//         console.log(this.state.index)

//     };

//     render() {
//         return ( // hardcode <h2>. replace.
//         <div>
//             <AppBar />
//             <br />
//             <br />
//             <div class="page-content">
//             <div class="resp-container">
//             <iframe class="resp-iframe" width="560" height="315" src="https://www.youtube.com/embed/ynUw0YsrmSg?version=3&controls=0&start=54&end=83&autoplay=1"
//                 frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
//             </div>
//                 <br />
//                 <h2>{this.props.moves[this.state.index].name}</h2>
//                 <Card>
//                     <div class="timer">
//                     <Timer
//                             initialTime={1000} // hardcode. replace.
//                             direction="backward"
//                             checkpoints={[
//                                 {time: 0,
//                                 callback: () => this.handleNext() } // callback function for when timer reaches 0
//                             ]}
//                         >
//                             {( { pause, resume } ) => ( // the formatValue attribute formats the seconds such that the leading 0 is displayed on single digits
//                                 <React.Fragment>
//                                 <div>
//                                     <Timer.Minutes formatValue={(value) => `${(value < 10 ? `0${value}` : value)}:`}/>
//                                     <Timer.Seconds formatValue={(value) => `${(value < 10 ? `0${value}` : value)}`}/>
//                                 </div>
//                                 <div>
//                                     <Button variant="contained" color="primary" onClick={pause}>Pause</Button>  <Button variant="contained" color="primary" onClick={resume}>Resume</Button>
//                                 </div>
//                                 </React.Fragment>
//                             )}
//                         </Timer>
//                     </div>
//                 </Card>
//             </div>
//         </div>
//         );
//     }
// }

// MoveComponent.propTypes = {
//     classes: PropTypes.object.isRequired,
//   };