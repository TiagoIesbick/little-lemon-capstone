import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BookingForm from './components/BookingForm';

describe("Booking Form", () => {
  const initialState = {date: ["2023-03-20"], time: [["select", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00"]]};

  test('If label "Number of Guests:" was rendered', () => {
    render(<BookingForm availableTimes={initialState} />);
    const strNumberOfGuests = screen.getByLabelText('Number of Guests:');
    expect(strNumberOfGuests).toBeInTheDocument();
  });

  test('If initial State date was passed to date input as a value', () => {
    render(<BookingForm  availableTimes={initialState} />);
    const strDate = screen.getByDisplayValue("2023-03-20");
    expect(strDate).toHaveAttribute('id', 'date');
  });

  test('If time is being selected', () => {
    const handleSubmit = jest.fn();
    const dispatch = jest.fn();
    render(<BookingForm  availableTimes={initialState} onSubmit={handleSubmit} dispatch={dispatch}/>);

    const timeSelect = screen.getByLabelText('Time:');
    fireEvent.change(timeSelect, {target: {value: "18:00"}});

    let options = screen.getAllByTestId('select-option')

    expect(options[0].selected).toBeFalsy();
    expect(options[1].selected).toBeFalsy();
    expect(options[2].selected).toBeTruthy();
  });


});