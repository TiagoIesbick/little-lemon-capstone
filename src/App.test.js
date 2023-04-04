import { render, screen, fireEvent, renderHook, act, waitFor } from '@testing-library/react';
import { updateTimes } from './components/Main';
import BookingForm from './components/BookingForm';
import { BrowserRouter } from 'react-router-dom';
import { useReducer } from 'react';


describe("Booking Form", () => {
  const initialState = {date: "2023-03-20", time: ["17:00", "18:00", "19:00", "20:00", "21:00"], selected_time: "17:00"};
  const {result} = renderHook(() => useReducer(updateTimes, initialState));
  const [state, dispatch] = result.current;
  const mockDispath = jest.fn(dispatch);
  const handleSubmit = jest.fn();

  test('If label "Number of Guests:" was rendered', () => {
    render(
      <BrowserRouter>
        <BookingForm availableTimes={state} dispatch={mockDispath} />
      </BrowserRouter>
    );
    const strNumberOfGuests = screen.getByLabelText('Number of Guests:');
    expect(strNumberOfGuests).toBeInTheDocument();
  });

  test('If initial State date was passed to date input as a value', () => {
    render(
      <BrowserRouter>
        <BookingForm availableTimes={state} dispatch={mockDispath} />
      </BrowserRouter>
    );
    const strDate = screen.getByDisplayValue("2023-03-20");
    expect(strDate).toHaveAttribute('id', 'date');
  });

  test('If updateTimes updates the values', () => {
    const updateAction = {type: 'SET_DATA', payload: {selected_time: "18:00"}};
    const updatedState = updateTimes(initialState, updateAction);
    expect(updatedState.selected_time).toEqual("18:00");
  });

  test('If dispatch from updateTimes is being called correctly', () => {
    render(
      <BrowserRouter>
        <BookingForm availableTimes={state} dispatch={mockDispath} today={initialState.date} />
      </BrowserRouter>
    );

    const selectedTime = screen.getByLabelText('Available Times:');
    const selectedDate = screen.getByLabelText('Date:');
    fireEvent.change(selectedTime, {target: {value: '18:00'}});
    fireEvent.change(selectedDate, {target: {value: '2023-03-21'}});
    // if selectedDate is less than today mockDispatch shouldn't be called
    fireEvent.change(selectedDate, {target: {value: '2023-03-19'}});

    expect(mockDispath).toHaveBeenCalledTimes(2);
    expect(mockDispath).not.toHaveBeenCalledTimes(1);
  });

  test('If submit button is disabled and handle submit not have been called when time is undefined and first name, last name and email fields are filled', () => {
    const newState = {date: "2023-03-20", time: [ "17:00", "18:00", "19:00", "20:00", "21:00"], selected_time: undefined};

    render(
      <BrowserRouter>
        <BookingForm availableTimes={newState} dispatch={mockDispath} today={initialState.date} onSubmit={handleSubmit} />
      </BrowserRouter>
    );

    const selectedTime = screen.getByLabelText('Available Times:');
    fireEvent.change(selectedTime, {target: {value: undefined}});

    const firstNameInput = screen.getByLabelText('First Name:');
    fireEvent.change(firstNameInput, {target: {value: 'John'}});

    const lastNameInput = screen.getByLabelText('Last Name:');
    fireEvent.change(lastNameInput, {target: {value: 'Dee'}});

    const emailInput = screen.getByLabelText('E-mail:');
    fireEvent.change(emailInput, {target: {value: 'john@gmail.com'}})

    const submitButton = screen.getByText('Submit');
    act(() => fireEvent.click(submitButton));

    expect(handleSubmit).not.toHaveBeenCalled();
    expect(submitButton).toHaveAttribute('disabled');
  });

  test('If submit button is available and handle submit have been called when time, first name, last name and email fields are filled', () => {
    render(
      <BrowserRouter>
        <BookingForm availableTimes={state} dispatch={mockDispath} today={initialState.date} onSubmit={act(handleSubmit)} setServerResponse={jest.fn()} loadingTimes={false} />
      </BrowserRouter>
    );

    const firstNameInput = screen.getByLabelText('First Name:');
    fireEvent.change(firstNameInput, {target: {value: 'John'}});

    const lastNameInput = screen.getByLabelText('Last Name:');
    fireEvent.change(lastNameInput, {target: {value: 'Dee'}});

    const emailInput = screen.getByLabelText('E-mail:');
    fireEvent.change(emailInput, {target: {value: 'john@gmail.com'}})

    const submitButton = screen.getByText('Submit');
    act(() => fireEvent.click(submitButton));

    expect(handleSubmit).toHaveBeenCalled();
    expect(submitButton).not.toHaveAttribute('disabled');
  });
});