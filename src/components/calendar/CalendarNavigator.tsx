import { Button, Stack, Typography } from '@mui/material'
import React from 'react'
import { useCalendarContext } from '@/store/CalendarContext'
import { months } from './Year';

const CalendarNavigator = () => {
	const {isYearView, currentDate} = useCalendarContext();

	const getDateString = () => {
		return isYearView
			? currentDate.getFullYear()
			: months[currentDate.getMonth()] + ' ' + currentDate.getFullYear()
	}

	const renderYearViewButton = () => {
		return !isYearView ? <ToggleYearViewButton/> : <></>
	}
	
	return (
		<>
			<Typography variant="h6">
				<Stack direction="row" alignItems="center">
					<DecrementDateButton/>
					{getDateString()}
					<IncrementDateButton/>
				</Stack>
			</Typography>
			{renderYearViewButton()}
		</>
	)
}

const DecrementDateButton = () => {
	const {
		isYearView, 
		setDate, 
		currentDate, 
		toggleBarOnDateClick, 
	} = useCalendarContext();

	const decrementDate = () => {
		isYearView
			? setDate(new Date(currentDate.getFullYear() - 1, currentDate.getMonth(), 1))
			: setDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
	}

	const handleClick = () => {
		decrementDate();
		toggleBarOnDateClick(0);
	}

	return (
		<Button
			size="small"
			color="info"
			onClick={handleClick}
			style={{ fontSize: '32px', color: 'black' }}
		>
			&lt;
		</Button>
	)
}

const IncrementDateButton = () => {
	const {
		isYearView, 
		setDate, 
		currentDate, 
		toggleBarOnDateClick, 
	} = useCalendarContext();

	function incrementDate() {
		isYearView
			? setDate(new Date(currentDate.getFullYear() + 1, currentDate.getMonth(), 1))
			: setDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
	}

	const handleClick = () => {
		incrementDate();
		toggleBarOnDateClick(0);
	}

	return (
		<Button
			size="small"
			color="info"
			onClick={handleClick}
			style={{ fontSize: '32px', color: 'black' }}
		>
			&gt;
		</Button>
	)
}

const ToggleYearViewButton = () => {
	const {changeView, toggleBarOnDateClick} = useCalendarContext();

	const handleClick = () => {
		changeView();
		toggleBarOnDateClick(0);
	}

	return (
		<Button
			onClick={handleClick}
			style={{ fontSize: '24px', color: 'black' }}
		>
			Year View
		</Button>
	)
}

export default CalendarNavigator