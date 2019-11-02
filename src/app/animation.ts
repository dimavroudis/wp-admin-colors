import { trigger, query, style, animate, transition, animateChild, group, keyframes } from '@angular/animations';

export const routerAnimation = trigger('routerAnimation', [
	transition('* => *', [
		query(':leave', animateChild(), { optional: true }),
		query(':enter', animateChild(), { optional: true }),
	])
]);

export const fadeInDown = trigger('fadeInDown', [
	transition(':enter', [
		style({ transform: 'translateY(-100%)', opacity: 0 }),
		animate('800ms ease-in-out', keyframes([
			style({ transform: 'translateY(-60%)', opacity: 0 }),
			style({ transform: 'translateY(0%)', opacity: 1 }),
		])),
		animateChild()
	]),
]);


export const fadeInUp = trigger('fadeInUp', [
	transition(':enter', [
		style({ transform: 'translateY(100%)', opacity: 0 }),
		animate('800ms ease-in-out', keyframes([
			style({ transform: 'translateY(60%)', opacity: 0 }),
			style({ transform: 'translateY(0%)', opacity: 1 }),
		])),
		animateChild()
	])
]);



export const fadeInRight = trigger('fadeInRight', [
	transition(':enter', [
		style({ transform: 'translateX(-100%)', opacity: 0 }),
		animate('800ms ease-in-out', keyframes([
			style({ transform: 'translateX(-60%)', opacity: 0 }),
			style({ transform: 'translateX(0%)', opacity: 1 }),
		])),
		animateChild()
	])
]);


export const fadeInLeft = trigger('fadeInLeft', [
	transition(':enter', [
		style({ transform: 'translateX(100%)', opacity: 0 }),
		animate('800ms ease-in-out', keyframes([
			style({ transform: 'translateX(60%)', opacity: 0 }),
			style({ transform: 'translateX(0%)', opacity: 1 }),
		])),
		animateChild()
	]),
]);

export const fadeOutRight = trigger('fadeInLeft', [
	transition(':enter',  [
		style({ transform: 'translateX(0%)', opacity: 1 }),
		animate('800ms ease-in-out', keyframes([
			style({ transform: 'translateX(10%)', opacity: 1 }),
			style({ transform: 'translateX(100%)', opacity: 0 }),
		])),
		animateChild()
	]),
]);


export const fadeIn = trigger('fadeIn', [
	transition(':enter', [
		style({ opacity: 0 }),
		animate('800ms ease-in-out', style({ opacity: 1 })),
		animateChild()
	]),
]);