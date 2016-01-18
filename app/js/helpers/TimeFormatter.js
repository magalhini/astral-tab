'use strict';

import moment from 'moment';

export default {
    timeAgo: (time) => moment(time).fromNow(),
    hoursDiff: (start, end) => {
        return moment.duration(end - start).asHours()
    }
};
