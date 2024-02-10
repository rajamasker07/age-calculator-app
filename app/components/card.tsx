'use client';

import React, { useState } from 'react'
import CustomInput from './custom.input'
import Image from 'next/image';
import arrowIcon from '../../public/assets/icon-arrow.svg';

export default function Card() {

  const [dateFormatted, setDateFormatted] = useState({
    days: 0,
    months: 0,
    years: 0,
  })

  const [day, setDay] = useState(0);
  const [month, setMonth] = useState(0);
  const [year, setYear] = useState(0)

  /**
   * update day state
   * @param day number
   */
  const dayChangeHandler = (day: number)  => {
    setDay(day);
  }

  /**
   * update month state
   * @param month number
   */
  const monthChangeHandler = (month: number) => {
    setMonth(month);
  }

  /**
   * update number year
   * @param year number
   */
  const yearChangeHandler = (year: number) => {
    setYear(year);
  }

  interface ageFormatted {
    days: number,
    months: number,
    years: number
  }

  const calculateAge = (
    day: number,
    month: number, 
    year: number
    ) => {
    // Get the current date
    const currentDate = new Date();
  
    // Set the birthdate using the given values
    const birthdate = new Date(year, month - 1, day);
  
    // difference in Ms
    const diffMs = currentDate.getTime() - birthdate.getTime();

    // difference in years (using 365.25 to account for leap years)
    const diffYears = Math.floor(diffMs / 86400000 / 365.25)

    // new difference time
    const diffTime = new Date(diffMs)
  
    // Format the output
    const ageFormatted: ageFormatted = {
      days: diffTime.getDate() - 1,
      months: diffTime.getMonth(),
      years: diffYears,
    };
    
    setDateFormatted(ageFormatted);
  }

  /**
   * get current year
   * @returns new date
   */
  const getCurrentYear = (): number => {
    return new Date().getFullYear();
  }

  /**
   * action to calculate age
   */
  const handleClick = () => {
    calculateAge(day, month, year);
  }

  return (
    <div className='flex flex-col rounded-br-[10rem] rounded-bl-lg rounded-t-lg w-fit p-8 shadow bg-white gap-3'>
      <div className="inline-flex items-center gap-4 w-full">
        <CustomInput name={'Day'} maxLength={2} placeholder={'DD'} errorMessage='Must be a valid day' stateChange={dayChangeHandler}/>
        <CustomInput name={'Mounth'} maxLength={2} placeholder={'MM'} errorMessage='Must be a valid mounth' max={12} stateChange={monthChangeHandler} />
        <CustomInput name={'Year'} maxLength={4} placeholder={'YYYY'} errorMessage='Must be a valid year' minLength={4} min={1900} max={getCurrentYear()} stateChange={yearChangeHandler}/>
      </div>
      <div className='w-full flex items-center xs:justify-center gap-1'>
        {/* <div className="lg:w-[550px] md:w-[550px] sm:w-fit"><hr /></div> */}
        <div className="h-[1px] bg-gray-400 xs:w-[200px] -z-1 xs:absolute md:relative md:w-[550px]"></div>
        <button onClick={handleClick} className='-z-0'>
          <Image src={arrowIcon} alt={'Arrow icon'} className='bg-violet-500 rounded-full p-4 size-16'/>
        </button>
      </div>
      <div className='md:*:text-[70px] *:font-bold xs:*:text-[40px]'>
        <h1>
          <span className='text-violet-500'>{dateFormatted.days === 0 ? '--' : dateFormatted.years}&nbsp;</span>
          years
        </h1>
        <h1>
          <span className='text-violet-500'>{dateFormatted.days === 0 ? '--' : dateFormatted.months}&nbsp;</span>
          mounths
        </h1>
        <h1>
          <span className='text-violet-500'>{dateFormatted.days === 0 ? '--' : dateFormatted.days}&nbsp;</span>
          days
        </h1>
      </div>
    </div>
  )
}
