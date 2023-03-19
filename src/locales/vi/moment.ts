import moment from 'moment'
import monent from 'moment'

export default moment.defineLocale('vi', {
  relativeTime: {
    future: '%s tới',
    past: '%s trước',
    s: 'vài giây',
    ss: '%d giây',
    m: 'một phút',
    mm: '%d phút',
    h: 'một giờ',
    hh: '%d giờ',
    d: 'một ngày',
    dd: '%d ngày',
    w: 'một tuần',
    ww: '%d tuần',
    M: 'một tháng',
    MM: '%d tháng',
    y: 'một năm',
    yy: '%d năm'
  }
})

