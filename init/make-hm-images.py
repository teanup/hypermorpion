"""BASE IMAGES CREATION FOR THE HYPERMORPION GAME"""

import os
import json
from PIL import Image, ImageDraw, ImagePalette
from sklearn.utils import resample

path = os.path.dirname(os.path.abspath(__file__))+'/src/games/hypermorpion/images/'
config = os.path.join(path, 'image-config.json')

# sizes: borders, squares, grids, board
with open(config, 'r') as img_config:
    img_cfg = json.load(img_config)

brd = img_cfg['borderWidth']
sq = img_cfg['squareSize']
rs = img_cfg['resizeCoeff']

gd = 3*(sq+brd)+brd
bd = gd*3+2



# needed colors
grey = [55, 56, 62]     # 0
blue = [0, 90, 209]     # 1
red = [191, 18, 27]     # 2
black = [32, 33, 36]    # 3
white = [136, 142, 154] # 4
green = [63, 152, 75]   # 5
colors = grey+blue+red+black+white+green
# make palette
palette = ImagePalette.ImagePalette(palette=bytes(colors))


def get_grid():
    grid_img = Image.new('P', (gd-2*brd, gd-2*brd), color=0)
    grid_img.putpalette(palette)

    # draw black lines
    draw = ImageDraw.Draw(grid_img)
    draw.line((sq, 0, sq, gd-1), fill=3)
    draw.line((2*sq+brd, 0, 2*sq+brd, gd-1), fill=3)
    draw.line((0, sq, gd-1, sq), fill=3)
    draw.line((0, 2*sq+brd, gd-1, 2*sq+brd), fill=3)

    return grid_img

def get_board():
    board_img = Image.new('P', (bd, bd), color=4)
    board_img.putpalette(palette)

    # draw grids
    grid_img = get_grid()
    for i in range(3):
        for j in range(3):
            x, y = 2*brd + i*gd, 2*brd + j*gd
            board_img.paste(grid_img, (x, y))
    
    return board_img

def get_x_sq():
    sq_img = Image.new('P', (sq, sq), color=0)
    sq_img.putpalette(palette)

    # draw lines
    draw = ImageDraw.Draw(sq_img)
    draw.line((1, 1, sq-2, sq-2), fill=1)
    draw.line((1, sq-2, sq-2, 1), fill=1)

    return sq_img


def get_o_sq():
    sq_img = Image.new('P', (sq, sq), color=0)
    sq_img.putpalette(palette)

    # draw lines
    draw = ImageDraw.Draw(sq_img)
    draw.line((2, 1, sq-3, 1), fill=2)
    draw.line((2, sq-2, sq-3, sq-2), fill=2)
    draw.line((1, 2, 1, sq-3), fill=2)
    draw.line((sq-2, 2, sq-2, sq-3), fill=2)

    return sq_img

def get_x_gd():
    gd_img = get_grid()

    # draw lines
    draw = ImageDraw.Draw(gd_img)
    draw.line(((4, 4), (gd-2*brd-5, gd-2*brd-5)), fill=1, width=3)
    draw.line(((4, gd-2*brd-5), (gd-2*brd-5, 4)), fill=1, width=3)

    return gd_img

def get_o_gd():
    gd_img = get_grid()

    # draw lines
    draw = ImageDraw.Draw(gd_img)
    draw.ellipse(((3, 3), (gd-2*brd-4, gd-2*brd-4)), outline=2, width=3)

    return gd_img

def get_null_gd():
    gd_img = get_grid()

    # draw lines
    draw = ImageDraw.Draw(gd_img)
    draw.ellipse(((3, 3), (gd-2*brd-4, gd-2*brd-4)), outline=4, width=2)
    draw.line(((2, 2), (gd-2*brd-4, gd-2*brd-4)), fill=4, width=2)

    return gd_img

def get_hgltd():
    gd_img = Image.new('P', (gd, gd), color=5)
    gd_img.putpalette(palette)

    # draw lines
    draw = ImageDraw.Draw(gd_img)
    draw.rectangle((brd, brd, gd-brd-1, gd-brd-1), fill=4)

    return gd_img

def resize(image, coeff):
    resized = image.resize((image.width*coeff, image.height*coeff), resample=Image.NEAREST)
    return resized

if __name__ == '__main__':

    base = get_board()
    resize(base, rs).save(path + "/base.png")

    x_sq = get_x_sq()
    resize(x_sq, rs).save(path + "/cross-sq.png")

    o_sq = get_o_sq()
    resize(o_sq, rs).save(path + "/round-sq.png")

    x_gd = get_x_gd()
    resize(x_gd, rs).save(path + "/cross-gd.png")

    o_gd = get_o_gd()
    resize(o_gd, rs).save(path + "/round-gd.png")

    null_gd = get_null_gd()
    resize(null_gd, rs).save(path + "/null-gd.png")

    hgltd = get_hgltd()
    resize(hgltd, rs).save(path + "/highlighted.png")

