import { differenceInHours, differenceInCalendarDays } from 'date-fns';
import { isHoliday, getHolidays } from "date-fns-holiday-us"

const regularRates = {
    daycare: {
        upTo4hrs: 30,
        upTo12hrs: 45,
        extraDogUpTo4hrs: 25,
        extraDogUpTo12hrs: 25
    },
    boarding: {
        baseRate: 65,
        extraDogRate: 50,
    }
};

const holidayRates = {
    daycare: {
        upTo4hrs: 40,
        upTo12hrs: 55,
        extraDogUpTo4hrs: 30,
        extraDogUpTo12hrs: 30
    },
    boarding: {
        baseRate: 85,
        extraDogRate: 55,
    }
};

export const calculateTotalPrice = (startTime, endTime, service, isHoliday, numDogs) => {
    const rates = isHoliday ? holidayRates : regularRates;
    const hours = differenceInHours(endTime, startTime);
    const days = differenceInCalendarDays(endTime, startTime);
    const remainingHours = hours - (days * 24);
    let totalPrice = 0;

    if (service === "daycare") {
        if (hours > 0 && hours <= 4) {
            totalPrice = rates.daycare.upTo4hrs;
            if (numDogs > 1) {
                totalPrice += (numDogs - 1) * rates.daycare.extraDogUpTo4hrs;
            }
        } else if (hours > 4 && hours <= 12) {
            totalPrice = rates.daycare.upTo12hrs;
            if (numDogs > 1) {
                totalPrice += (numDogs - 1) * rates.daycare.extraDogUpTo12hrs;
            }
        } else if (hours > 12) {
            totalPrice = rates.boarding.baseRate;
            if (numDogs > 1) {
                totalPrice += (numDogs - 1) * rates.boarding.extraDogRate;
            }
        }
    } else if (service === "boarding") {
        if (hours <= 24) {
            totalPrice = rates.boarding.baseRate;
            if (numDogs > 1) {
                totalPrice += (numDogs - 1) * rates.boarding.extraDogRate;
            }
        } else {
            totalPrice = days * rates.boarding.baseRate;
            if (numDogs > 1) {
                totalPrice += (numDogs - 1) * days * rates.boarding.extraDogRate;
            }

            if (remainingHours > 0 && remainingHours <= 4) {
                totalPrice += rates.daycare.upTo4hrs;
                if (numDogs > 1) {
                    totalPrice += (numDogs - 1) * rates.daycare.extraDogUpTo4hrs;
                }
            } else if (remainingHours > 4 && remainingHours <= 12) {
                totalPrice += rates.daycare.upTo12hrs;
                if (numDogs > 1) {
                    totalPrice += (numDogs - 1) * rates.daycare.extraDogUpTo12hrs;
                }
            } else if (remainingHours > 12) {
                totalPrice += rates.boarding.baseRate;
                if (numDogs > 1) {
                    totalPrice += (numDogs - 1) * rates.boarding.extraDogRate;
                }
            }
        }
    }

    return totalPrice;
};


