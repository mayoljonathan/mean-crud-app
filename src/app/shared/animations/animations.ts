import {trigger, state, animate, style, transition} from '@angular/animations';

export function pageTransition() {
  return {
    fadeInAndOut: fadeInAndOut,
    slideToLeft: slideToLeft,
    slideToRight: slideToRight
  };
}

export function fadeInAndOut(){
  return trigger('pageTransition', [
    transition(':enter', [
      style({opacity: 0}),
      animate('1s ease', style({opacity: 1}))
    ]),
    transition(':leave', [
      style({opacity: 1}),
      animate('0.5s ease', style({opacity: 0}))
    ])
  ])
}

// function fadeInAndOut(){
//   return trigger('pageTransition', [
//     // state('void', style({position:'fixed', width:'100%'}) ),
//     // state('*', style({position:'fixed', width:'100%'}) ),
//     transition(':enter', [
//       style({opacity: 0}),
//       animate('1s ease-in-out', style({opacity: 1}))
//     ]),
//     transition(':leave', [
//       style({opacity: 1}),
//       animate('0.5s ease-in-out', style({opacity: 0}))
//     ])
//   ])
// }

export function slideToRight() {
  return trigger('pageTransition', [
    state('void', style({ width:'100%'}) ),
    state('*', style({ width:'100%'}) ),
    transition(':enter', [
      style({transform: 'translateX(-100%)'}),
      animate('0.5s ease-in-out', style({transform: 'translateX(0%)'}))
    ]),
    transition(':leave', [
      style({transform: 'translateX(0%)'}),
      animate('0.5s ease-in-out', style({transform: 'translateX(100%)'}))
    ])
  ]);
}

export function slideToLeft() {
  // return trigger('pageTransition', [
  //   transition(':enter', [
  //     style({transform: 'translateX(100%)', position:'fixed', width:'100%'}),
  //     animate('0.5s ease-in-out', style({transform: 'translateX(0%)'}))
  //   ]),
  //   transition(':leave', [
  //     style({transform: 'translateX(0%)', position:'fixed', width:'100%'}),
  //     animate('0.5s ease-in-out', style({transform: 'translateX(-100%)'}))
  //   ])
  // ]);

//   @-webkit-keyframes slideLeftIn {
//     0% {
//         -webkit-transform: translateX(90%)
//     }
//     100% {
//         -webkit-transform: translateX(0)
//     }
// }

  return trigger('pageTransition', [
    state('void', style({ 

      width:'100%'
    })),
    state('*', style({ width:'100%'}) ),
    transition(':enter', [
      style({transform: 'translateX(120%)'}),
      animate('1s ease-in-out', style({transform: 'translateX(0%)'}))
    ]),
    // transition(':leave', [
    //   style({transform: 'translateX(0%)'}),
    //   animate('0.5s ease-in-out', style({transform: 'translateX(-100%)'}))
    // ])
  ]);
}

// function slideToBottom() {
//   return trigger('pageTransition', [
//     state('void', style({position:'fixed', width:'100%', height:'100%'}) ),
//     state('*', style({position:'fixed', width:'100%', height:'100%'}) ),
//     transition(':enter', [
//       style({transform: 'translateY(-100%)'}),
//       animate('0.5s ease-in-out', style({transform: 'translateY(0%)'}))
//     ]),
//     transition(':leave', [
//       style({transform: 'translateY(0%)'}),
//       animate('0.5s ease-in-out', style({transform: 'translateY(100%)'}))
//     ])
//   ]);
// }

// function slideToTop() {
//   return trigger('pageTransition', [
//     state('void', style({position:'fixed', width:'100%', height:'100%'}) ),
//     state('*', style({position:'fixed', width:'100%', height:'100%'}) ),
//     transition(':enter', [
//       style({transform: 'translateY(100%)'}),
//       animate('0.5s ease-in-out', style({transform: 'translateY(0%)'}))
//     ]),
//     transition(':leave', [
//       style({transform: 'translateY(0%)'}),
//       animate('0.5s ease-in-out', style({transform: 'translateY(-100%)'}))
//     ])
//   ]);
// }