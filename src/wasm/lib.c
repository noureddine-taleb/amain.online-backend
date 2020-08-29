#include <stdio.h>
#include <emscripten/emscripten.h>

int add(int, int);

int main(int argc, char** argv){
    int c = add(3,5);
    printf("results : %d\n", c);
}


int EMSCRIPTEN_KEEPALIVE add (int a, int b){
    return a + b;
}

void EMSCRIPTEN_KEEPALIVE myFunction(int argc, char ** argv) {
    printf("MyFunction Called\n");
}