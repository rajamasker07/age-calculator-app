import React, { ChangeEvent } from 'react';

type inputProp = {
  name: string,
  maxLength: number,
  minLength?: number,
  max?: number,
  placeholder: string,
  errorMessage?: string
  min?: number
  // eslint-disable-next-line no-unused-vars
  stateChange: (value: number) => void
}
export default function CustomInput({
  name,
  maxLength = 2,
  max = 30,
  placeholder,
  errorMessage = "invalid",
  minLength = 2,
  min = 1,
  stateChange,
}: inputProp) {

  const onUpdateStateHandler = (e:ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    stateChange(Number(value))
  }

  return (
    <label htmlFor={name}
      className='has-[:invalid]:text-red-500 flex flex-col max-w-40 min-w-5 min-h-[auto] w-auto text-neutral-500'
    >
      <span className='font-bold uppercase text-sm tracking-[.193em] mb-3'>
        {name}
      </span>
      <input 
        type="number"
        name={name}
        id={name}
        className='
        peer
        ring-1 ring-neutral-300
        rounded
        text-lg uppercase font-bold
        p-3
        h-fit
        w-full
        focus:ring-1 focus:ring-violet-600 focus:outline-none focus:invalid:ring-red-500 appearance-none
        '
        max={max}
        min={min}
        maxLength={maxLength}
        minLength={minLength}
        pattern='[0-9]*'
        placeholder={placeholder}
        required
        onChange={onUpdateStateHandler}
      />
      <span className='peer-invalid:visible invisible text-xs mt-1'>
        { errorMessage }
      </span>
    </label>
  );
}
