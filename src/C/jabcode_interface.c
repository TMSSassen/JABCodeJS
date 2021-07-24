#include <stdlib.h>
#include <string.h>
#include <emscripten.h>
#define STB_IMAGE_IMPLEMENTATION
#include "../../include/stb_image.h"
#include "../../include/jabcode.h"

unsigned char* formatted_array;

unsigned char* format_array(unsigned char* arr,int array_length,char bytes_per_array_elem,
    unsigned char* args,int arg_length,char bytes_per_arg_elem)
{
    if(formatted_array) {free(formatted_array);}
    formatted_array=(unsigned char*)malloc(array_length*bytes_per_array_elem
            + arg_length*bytes_per_arg_elem
            + 8);
    unsigned char *arr_length_bytes=(unsigned char*)(&array_length);
    unsigned char *arg_length_bytes=(unsigned char*)(&arg_length);
    for(int i=0;i<4;i++){
        formatted_array[i]=arr_length_bytes[i];
        formatted_array[i+4]=arg_length_bytes[i];
    }
    array_length *= bytes_per_array_elem;
    arg_length *= bytes_per_arg_elem;
    for(int i=0;i<arg_length;i++){
        formatted_array[i+8]=args[i];
    }
    for(int i=0;i<array_length;i++){
	formatted_array[i+arg_length+8]=arr[i];
    }
    return formatted_array;
}
EMSCRIPTEN_KEEPALIVE
int getDefaultSymbolNumber(){
    return MAX_SYMBOL_NUMBER;
}
EMSCRIPTEN_KEEPALIVE
int getDefaultColorNumber(){
    return MAX_COLOR_NUMBER;
}

EMSCRIPTEN_KEEPALIVE
unsigned char* encode_image(char* data_string,int color_number,int symbol_number) {
    jab_int32 length=strlen(data_string);
    jab_data* data = (jab_data *)malloc(sizeof(jab_data) + length * sizeof(char));
    if(!data)
    {
        reportError("Memory allocation for input data failed");
        return 0;
    }
    data->length = length;
    memcpy(data->data, data_string, length);
    jab_encode* enc = createEncode(color_number, symbol_number);
    generateJABCode(enc,data);
    jab_bitmap* bitmap=enc->bitmap;
    length = (bitmap->height)*(bitmap->width)*(bitmap->bits_per_pixel / 8);
    int args[3]={bitmap->width,bitmap->height,enc->color_number};
    unsigned char* image=format_array(bitmap->pixel,length,1,(unsigned char*) args,3,sizeof(int));
    free(enc);
    free(data);
    free(bitmap);
    return image;
}

EMSCRIPTEN_KEEPALIVE
unsigned char* decode_image(unsigned char* pixels,int length){
    int width,height,channels;
    stbi_uc* img=stbi_load_from_memory(pixels,length,&width,&height,&channels,4);
    length=height * width * 4;
    jab_bitmap* bitmap = (jab_bitmap*)malloc(sizeof(jab_bitmap) +  length*sizeof(char));
    bitmap->height=height;
    bitmap->width=width;
    bitmap->bits_per_channel = BITMAP_BITS_PER_CHANNEL;
    bitmap->bits_per_pixel = BITMAP_BITS_PER_PIXEL;
    bitmap->channel_count = BITMAP_CHANNEL_COUNT;
    for(int i=0;i<length;i++){
	bitmap->pixel[i]=img[i];
    }
    //saveImage(bitmap, "test.png");
    jab_int32 mode;
    jab_int32 status;
    jab_decoded_symbol symbols[MAX_SYMBOL_NUMBER];
    jab_data* data = decodeJABCodeEx(bitmap, mode,&status, symbols, MAX_SYMBOL_NUMBER);
    free(bitmap);
    unsigned char* result=format_array((unsigned char*)data->data,data->length,1,NULL,0,0);
    free(data);
    return result;
}