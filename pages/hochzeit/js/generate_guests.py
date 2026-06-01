import numpy as np
import numpy.random as random
import qrcode
import json
from PIL import Image, ImageDraw, ImageFont

guests = [
    ["Doris"],
    ["Stefan"],
    ["Lisa", "Niklas"],
    ["Bettina", "Dieter"],
    ["Mirjam"] ,
    ["Johannes"],
    ["Doro", "Klaus"],
    ["Gudrun", "Karl"],
    ["Jonas"],
    ["Leonie"],
    ["Simona"],
    ["Susanna", "Andrei", "Nathanael"],
    ["Lila"],
    ["Anke", "Flo"],
    ["Lukas", "Maike"],
    ["Robert", "Lotti", "Mali", "Feli"],
    ["Maja", "Taylor", "Charlotte"],
    ["Clarissa", "Shayan"],
    ["Lena", "Laurin"],
    ["Daniel", "Jasmin"],
    ["Jakob"],
    ["Malte"],
    ["Yannick", "Julia"],
    ["Elena"],
    ["Michael", "Jenny"],
    ["Christian", "Heike"],
    ["Regina", "Franz"],
    ["Thomas"],
    ["Sophia", "JB"],
    ["Jinhao"],
    ["Nick"],
    ["Jana", "Tobi"],
    ["Lopi"],
    ["Hannah"],
    ["Korbinian"],
    ["Anja"]
]
# special codes for special guests
personalized_codes = {
    "".join(["Johannes"]): "1:49:55",
    "".join(["Mirjam"]): "JojoStinkt",
    "".join(["Anke", "Flo"]): "CodeDesChaos",
    "".join(["Bettina", "Dieter"]): "TRDH35",
    "".join(["Robert", "Lotti", "Mali", "Feli"]): "DemPapaSeinCode",
    "".join(["Sophia", "JB"]) : "KodZaPokana",
}

guests_lookup = {
    "".join(guest): guest_idx for guest_idx, guest in enumerate(guests)   
}


def generateQrCode(link, filename, guest_names, code, font_size=16):
    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_L,
        box_size=10,
        border=4,
    )
    qr.add_data(link)
    qr.make(fit=True)

    img = qr.make_image(fill_color="black", back_color="white").convert("RGB")
    qr_width, qr_height = img.size
    font_name = "../../../webfonts/Roboto-Regular.ttf"
    try:
        font = ImageFont.truetype(font_name, font_size)
    except OSError:
        print(f"{font_name} not found. Using default font.")
        font = ImageFont.load_default()
    text_lines = [f"{', '.join(guest_names)}", f"Einladungscode: {code}"]
    text_height = sum(ImageDraw.Draw(img).textsize(line, font=font)[1] for line in text_lines)
    padding = 10
    new_height = qr_height + text_height + padding * 3
    new_width = max(qr_width, max(ImageDraw.Draw(img).textsize(line, font=font)[0] for line in text_lines) + padding * 2)

    final_img = Image.new("RGB", (new_width, new_height), "white")
    qr_x = (new_width - qr_width) // 2
    final_img.paste(img, (qr_x, 0))

    draw = ImageDraw.Draw(final_img)
    y = qr_height + padding
    for line in text_lines:
        text_width, text_line_height = draw.textsize(line, font=font)
        x = (new_width - text_width) // 2
        draw.text((x, y), line, fill="black", font=font)
        y += text_line_height + padding

    final_img.save(filename)
    return

if __name__ == "__main__":

    # reproduce the same code every time
    random.seed(483195)

    # generate 6 digit code 
    imin, imax = 100000, 999999

    # generate codes and links
    Nguest = len(guests)  
    codes = list(random.choice(range(imin, imax), size=len(guests), replace=False))

    # replace codes for personalized guests
    for guest, code in personalized_codes.items():
        guest_idx = guests_lookup["".join(guest)]
        codes[guest_idx] = code
        print(f"Personalized code for {guest}: {code}")

    links = [f"https://j-sphere.github.io/pages/hochzeit/wedding.html?code={code}#rsvp" for code in codes]

    out_dir = "../../../resource/"
    font_size = 36

    guests_json = {
        str(code) : {
            "names" : guest,
        } for guest, code in zip(guests, codes)
    }

    print(guests_json)



    with open('./guests.json', 'w') as fp:
        json.dump(guests_json, fp)


    for guest, link, code in zip(guests, links, codes):

        guest_str = "".join(guest)

        print(f"{guest}: {link}")
        generateQrCode(link, out_dir + f"qr_{guest_str}_{code}.png", guest, code, font_size=font_size)
