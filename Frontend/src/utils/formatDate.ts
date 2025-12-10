// export const formateDate = (isoDate: string) => {
//     if (!isoDate) return "";

//     const date = new Date(isoDate);
//     console.log("date", date)

// }


export function dateWithTime(date: string | number | Date, locale = 'en-US') {
    if (!date) return '';

    const d = new Date(date);

    // Day with two digits
    const day = d.getDate().toString().padStart(2, '0');
    // Month as short name (e.g., 'Oct')
    const month = d.toLocaleString(locale, { month: 'short' });
    // Year as four digits
    const year = d.getFullYear();
    // Hours and minutes
    let hours = d.getHours();
    const minutes = d.getMinutes().toString().padStart(2, '0');
    // AM/PM
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    const hourStr = hours.toString().padStart(2, '0');

    // Construct the custom date string
    return `${day}${month} ${year}, ${hourStr}:${minutes} ${ampm}`;
}



// export function dateWithTime(date: string | number | Date, locale = 'en-US') {
//     if (!date) return '';

//     const options: Intl.DateTimeFormatOptions = {
//         month: 'short',
//         day: '2-digit',
//         year: 'numeric',
//         hour: '2-digit',
//         minute: '2-digit',
//         hour12: true,
//     };

//     return new Date(date).toLocaleString(locale, options).replace(',', '');
// }
