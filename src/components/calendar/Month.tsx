import React from 'react'
import { Typography, Button } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import { CalendarProps } from './Calendar'
import Day from './Day';

const noValue = '';

interface MonthProps {
	daysOfWeek: string[]
	currentDate: Date
	isMonthView: boolean
	handleDayClickBar: Function
}

const Month = (props: MonthProps) => {
	const numBoxes = 42;
	const firstDayOffset = new Date(props.currentDate.getFullYear(), props.currentDate.getMonth(), 1).getDay() - 1;
	const numDaysInMonth = new Date(props.currentDate.getFullYear(), props.currentDate.getMonth() + 1, 0).getDate();

	const handleDayClick = (day: any) => {
		props.handleDayClickBar(1, formatDate(props.currentDate, day));
	}

	const formatDate = (date: Date, day: any) => {
		let mm = date.getMonth() + 1 //January is 0!
		let finalDate = ''
		const yyyy = date.getFullYear()

		if (mm < 10) {
			finalDate += '0' + mm
		} else {
			finalDate += mm
		}

		if (day < 10) {
			finalDate += '-' + '0' + day
		} else {
			finalDate += '-' + day
		}

		finalDate += '-' + yyyy
		return finalDate.toString()
	}

  	const renderDays = () => {
		const shouldRenderfirstDaysOfWeek = (i: number) => i < 7;
		const days = []

		for (var i = 0; i < numBoxes; i++) {
			let day = i - firstDayOffset;
			let dayOfWeek = noValue;
			
			if (day <= 0 || day > numDaysInMonth) {
				day = 0;
			}
			if (shouldRenderfirstDaysOfWeek(i)) {
				dayOfWeek = props.daysOfWeek[i];
			}
			days.push(
				<Day 
					key={i} 
					day={day} 
					dayOfWeek={dayOfWeek} 
					isMonthView={props.isMonthView} 
					handleDayClick={handleDayClick}
				/>
			)
		}
		return days
  	}

	return (
		<Grid container 
			columns={7} 
			spacing={0} 
			border={props.isMonthView ? 1 : 0} 
			textAlign='center'
			alignItems='stretch'
			sx={{ height: '100%' }}
		>
			{renderDays()}
		</Grid>
	)
}

export default Month
