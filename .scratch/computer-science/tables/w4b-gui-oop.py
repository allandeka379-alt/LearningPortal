# Python programs shown in lessons/prog/gui-oop.md and its questions; output pasted from this run.
class Learner:
    def __init__(self, name, form):
        self.name = name
        self.form = form

    def describe(self):
        return self.name + " is in Form " + str(self.form)


class Prefect(Learner):
    def __init__(self, name, form, duty):
        super().__init__(name, form)
        self.duty = duty

    def describe(self):
        return self.name + " is a prefect in charge of " + self.duty


people = [Learner("Rudo", 3), Prefect("Farai", 4, "the library")]
for person in people:
    print(person.describe())

print("3" + "4")
print(int("3") + int("4"))
