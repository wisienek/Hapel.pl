
#zadanie 1
x = input("Podaj wiadomość: ") # wpisz coś

if x and x!="nic": # jeżeli jest wpisane lub nie jest "nic" wypisz tajną
    print("Tajna wiadomość: "+x)


#zadanie 2
import math
h = int(input("Podaj wysokość rombu: "))

if h%2 == 1:
    for i in range(1,h+1):
        row=""

        for j in range(h):
            if i == math.ceil(h/2):
                row+="#"
            else:
                if i < math.ceil(h/2):
                    if j <= math.floor(h/2)-i or j >= math.floor(h/2)+i:
                        row+="."
                    else:
                        row+="#"
                else:
                    if j < math.floor(h/2) - (h-i) or j > math.floor(h/2)+ (h-i):
                        row+="."
                    else:
                        row+="#"


        print(row)
        
else:
    print("Wysokość musi być nieparzysta")


#zadanie 3
figura = input("Podaj nazwę lub numer figury: ")


def trojkat(a,h):
    return (a*h)/2

def trapez(a,b,h):
    return ((a+b)*h)/2


def rownoleglobok(a,h):
    return (a*h)/2


if figura:
    if figura == "trójkąt" or figura=="1":

        a = float(input("Podaj a: "))
        h = float(input("Podaj h: "))
        if a and h:
            if a>0 and h>0:
                pole = trojkat(a,h)
                print("Pole trójkąta o danych a="+str(a)+" i h="+str(h)+" jest równe: "+str(pole))
            else:
                print("Dane muszą być >0")

    elif figura == "trapez" or figura==2:

        a = float(input("Podaj a: "))
        b = float(input("Podaj b: "))
        h = float(input("Podaj h: "))
        if a and b and h:
            if a>0 and b and h>0:
                pole = trapez()
                print("Pole trapezu o danych a="+str(a)+", b="+str(b)+" i h="+str(h)+" jest równe: "+str(pole))
            else:
                print("Dane muszą być >0")
        
    elif figura == "równoległobok" or figura==3:
        a = float(input("Podaj a: "))
        h = float(input("Podaj h: "))
        if a and h:
            if a>0 and h>0:
                pole = rownoleglobok(a,h)
                print("Pole równoległoboku o danych a="+str(a)+" i h="+str(h)+" jest równe: "+str(pole))
            else:
                print("Dane muszą być >0")
    else:
        print("Błędna figura")




#zadanie 4
import random

l = []
for x in range(10):
    l.append(int(random.random() * 100))

najw = l[0]
najm = l[0]
for x in l:
    if najw < x:
        najw = x
    if najm > x:
        najm = x

print(l)

print("Największa liczba to: "+str(najw))
print("Najmniejsza liczba to: "+str(najm))

#zadanie 5
import json

slownik = {"s1": [2,2,3], "s2": [4,5,5]}

def dodajUcznia(uczen):
    slownik[uczen] = []

def dodajOcene(uczen, ocena):
    slownik[uczen].append(ocena)

def sredniaOcen(uczen):
    oceny = slownik[uczen]
    srednia=0
    for x in oceny:
        srednia = srednia + x
    srednia = srednia/len(oceny)
    return srednia

dodajUcznia("Staś")
dodajOcene("Staś", 5)

x = sredniaOcen("Staś")
print(x)
