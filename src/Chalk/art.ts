/*
 * create-adonis-ts-app
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import gradient from 'gradient-string'

const art = Buffer.from(
  'CiAgICAgXyAgICAgICBfICAgICAgICAgICAgIF8gICAgICAgICBfIF9fX18gIAogICAgLyBcICAgX198IHwgX19fICBfIF9fIChfKV9fXyAgICB8IC8gX19ffCAKICAgLyBfIFwgLyBfYCB8LyBfIFx8ICdfIFx8IC8gX198XyAgfCBcX19fIFwgCiAgLyBfX18gXCAoX3wgfCAoXykgfCB8IHwgfCBcX18gXCB8X3wgfF9fXykgfAogL18vICAgXF9cX18sX3xcX19fL3xffCB8X3xffF9fXy9cX19fL3xfX19fLyAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCg==',
  'base64'
).toString()

export const showArt = () => console.log(gradient.pastel.multiline(art))
