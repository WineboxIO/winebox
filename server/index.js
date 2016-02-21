import {join} from 'path';
import express from 'express';

import morgan from 'morgan';
import compression from 'compression';
import cookieParser from 'cookie-parser';

const router = express();

router.use(morgan(router.get('env') === 'production' ? 'common' : 'dev'));
router.use(compression());
router.use(cookieParser());
router.use(express.static(join(__dirname, '..', 'public')));

router.listen(process.env.PORT, process.env.HOST);

export default router;
