'use strict'
import paths from '../common/paths'
import fs from '../common/fs'

fs.prepare(paths.libPath)

fs.copy(paths.distPath, paths.libPath)
