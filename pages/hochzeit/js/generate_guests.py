import numpy as np
import numpy.random as random
import qrcode
import json

guests = [
    ["Doris", "Stefan"],
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
    ["Yannik", "Julia"],
    ["Elena"],
    ["Michael", "Jenny"],
    ["Chrisitan", "Heike"],
    ["Regina", "Franz"],
    ["Thomas"],
    ["Sophia", "JB"],
    ["Jinhao"],
    ["Nick"],
    ["Jana"],
    ["Tobi"],
    ["Lopi"],
]

def generateQrCode(link, filename):
    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_L,
        box_size=10,
        border=4,
    )
    qr.add_data(link)
    qr.make(fit=True)

    img = qr.make_image(fill_color="black", back_color="white")
    img.save(filename)
    return

if __name__ == "__main__":

    # reproduce the same code every time
    random.seed(483195)

    # generate 6 digit code 
    imin, imax = 100000, 999999

    # generate codes and links
    Nguest = len(guests)  
    codes = random.choice(range(imin, imax), size=len(guests), replace=False)
    links = [f"https://j-sphere.github.io/pages/hochzeit/wedding.html?code={code}#rsvp" for code in codes]

    out_dir = "../../../resource/"

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
        generateQrCode( link, out_dir + f"qr_{guest_str}_{code}.png")    

